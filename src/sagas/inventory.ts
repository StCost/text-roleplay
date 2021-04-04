import { all, takeLatest } from 'redux-saga/effects';

import { IInventoryItem } from '../reducers/interfaces';
import { database } from '../helpers/firebase';
import { IPayload } from '../reducers/actions';
import actions from '../reducers/actions';
import { changeMessage } from './messages';
import { getItemName } from '../helpers/utils';

function* passItem(payload: IPayload) {
  const { id, uid, demonstrate, use, item, to, ignoreAmountCheck } = payload;

  if (id && uid && item) {
    const name = getItemName(item);
    if (demonstrate) {
      actions.sendMessage({
        uid,
        message: `*показывает ${name}`,
        data: { itemId: id, amount: item.amount },
      });
      actions.passItemSuccess({});
      actions.notify({ message: `Вы показали ${name}` });
      // actions.redirect({ to: '/chat' });
      return true;
    }

    if (!ignoreAmountCheck && item.type !== 'weapon') {
      const removed = yield removeItem({ id, uid, amount: item.amount });
      if (!removed) {
        console.error(`passItem error:`, payload);
        actions.passItemFail({ id, uid });
        return false;
      }
    }

    if (use) {
      const name = getItemName(item, false);
      actions.sendMessage({
        uid,
        message: `*использовал ${name}`,
        data: { itemId: id },
      });
      actions.notify({ message: `Вы использовали ${name}` });
      // actions.redirect({ to: '/chat' });
      actions.passItemSuccess({});
      return true;
    }

    if (to) {
      actions.giveItem({ uid: to.uid, id, itemType: item.type, amount: item.amount });
      actions.notify({ message: `Вы передали '${item.name}' игроку '${to.nickname}'` });
      actions.sendMessage({
        uid,
        message: `*передал ${item.name} игроку '${to.nickname}'`,
        data: { itemId: id },
      });
      actions.passItemSuccess({});
      return;
    }

    actions.sendMessage({
      uid,
      message: `*выбросил ${name}`,
      data: { itemId: id, amount: item.amount, type: item.type },
    });
    actions.notify({ message: `Вы выбросили ${name}` });
    // actions.redirect({ to: '/chat' });
    actions.passItemSuccess({});
    return true;
  }

  actions.passItemFail({ id, uid });
  console.error(`passItem error: id, uid, or item are not defined`, payload);
  return false;
}

function* removeItem(payload: IPayload) {
  const { id, uid, amount = 1 } = payload;
  const ref = database
    .ref(`characters`)
    .child(uid)
    .child('inventory');

  const sameItem = yield getInventoryItem({ id, uid });
  if (sameItem) {
    if (sameItem.amount - amount >= 1) {
      const item = {
        ...sameItem,
        amount: sameItem.amount - amount,
      };

      yield ref.child(`${id}|${sameItem.time}`).set(item);
      actions.removeItemSuccess({ id, uid });
      return true;
    }

    yield ref.child(`${id}|${sameItem.time}`).remove();
    actions.removeItemSuccess({ id, uid });
    return true;
  }

  console.error(`removeItem error: User '${uid}' doesn't have item '${id}'`);
  actions.notify({ message: `Предмета нет в инвентаре` });
  actions.removeItemFail({ id, uid, error: 'has-no-item' });
  return false;
}

function* getInventoryItem(payload: IPayload) {
  const { id, uid } = payload;

  const rawItems = yield database
    .ref('characters')
    .child(uid)
    .child('inventory')
    .once('value');

  const items: IInventoryItem[] = Object.values(rawItems.val() || {});
  if (items.length) {
    const item: IInventoryItem | undefined = items.find(item => item.id === id);
    if (item)
      return item;
  }
  return;
}

function* giveItem(payload: IPayload) {
  const { id, uid, itemType, amount = 1 } = payload;
  if (!id || !uid || !itemType) {
    console.error('giveItem error. One of the properties are not defined', id, uid, itemType);
    actions.giveItemFail({});
    return;
  }

  const time = Date.now();
  let item: IInventoryItem = { id, time, type: itemType, amount: amount };

  if (itemType !== 'weapon' && itemType !== 'wearable') {
    const sameItem = yield getInventoryItem({ id, uid });
    if (sameItem) {
      item.amount = (sameItem.amount || 1) + amount;
      item.time = sameItem.time;
    }
  }

  const fullId = `${item.id}|${item.time}`;
  yield database
    .ref('characters')
    .child(uid)
    .child('inventory')
    .child(fullId)
    .set(item);

  actions.giveItemSuccess({ id, uid });
  return true;
}

function* takeItem(payload: IPayload) {
  const { uid, message } = payload;
  const { itemId, amount, type } = message.data;

  message.data.taken = true;

  const took = yield changeMessage({ uid, message });
  if (took && type) {
    const item = yield giveItem({
      id: itemId,
      uid,
      amount: amount || 1,
      itemType: type,
    });
    if (item) {
      actions.sendMessage({
        uid,
        message: `*подобрал предмет`,
      });
      actions.takeItemSuccess({});
      return true;
    }
  }

  console.error('takeItem error. Cant take or no item', payload);
  actions.takeItemFail({});
  return false;
}

export default function* watchForActions() {
  yield all([
    takeLatest('GIVE_ITEM', giveItem),
    takeLatest('REMOVE_ITEM', removeItem),
    takeLatest('PASS_ITEM', passItem),
    takeLatest('TAKE_ITEM', takeItem),
  ]);
}
