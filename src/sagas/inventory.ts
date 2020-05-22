import { all, takeLatest } from 'redux-saga/effects';

import { IInventoryItem, IItem } from '../reducers/interfaces';
import { database } from '../helpers/firebase';
import { IPayload } from '../reducers/actions';
import actions from '../reducers/actions';
import { changeMessage } from './messages';

function* deleteItem(payload: IPayload) {
  const { id } = payload;

  yield database
    .ref('items')
    .child(id)
    .remove();

  actions.deleteItemSuccess({ id });
  actions.notify({ message: 'Предмет успешно удалён' });
}

function* passItem(payload: IPayload) {
  const { id, uid, demonstrate, use, item, to } = payload;

  if (id && uid) {
    if (demonstrate) {
      actions.sendMessage({
        uid,
        message: `*показывает предмет`,
        data: { itemId: id },
      });
      actions.passItemSuccess({});
      actions.notify({ message: `Вы показали ${item ? `'${item.name}'` : 'предмет'}` });
      actions.redirect({ to: '/text-roleplay/chat' });
      return true;
    }

    const removed = yield removeItem({ id, uid });
    if (!removed) {
      console.error(`passItem error:`, payload);
      actions.passItemFail({ id, uid });
      return false;
    }

    if (use) {
      actions.sendMessage({
        uid,
        message: '*использовал предмет',
        data: { itemId: id },
      });
      actions.notify({ message: `Вы использовали ${item ? `'${item.name}'` : 'предмет'}` });
      actions.redirect({ to: '/text-roleplay/chat' });
      actions.passItemSuccess({});
      return true;
    }

    if (to) {
      actions.giveItem({ uid: to.uid, id, itemType: item.type });
      actions.notify({ message: `Вы передали '${item.name}' игроку '${to.nickname}'` });
      actions.passItemSuccess({});
      return;
    }

    if (item) {
      actions.sendMessage({
        uid,
        message: '*выбросил предмет',
        data: { itemId: id, item },
      });
      actions.notify({ message: `Вы выбросили ${item ? `'${item.name}'` : 'предмет'}` });
      actions.redirect({ to: '/text-roleplay/chat' });
      actions.passItemSuccess({});
      return true;
    }

    actions.notify({ message: `Произошла ошибка. Обратитесь к админу с ошибкой из консоли` });
    console.error(payload);
    return;
  }

  actions.passItemFail({ id, uid });
  console.error(`passItem error: id and uid are not defined`, payload);
  return false;
}

function* removeItem(payload: IPayload) {
  const { id, uid, all } = payload;
  const ref = database
    .ref(`users`)
    .child(uid)
    .child('inventory');

  const sameItem = yield getInventoryItem({ id, uid });
  if (sameItem) {
    if (!all && sameItem.amount >= 2) {
      const item = {
        ...sameItem,
        amount: sameItem.amount - 1,
      };

      yield ref.child(`${id}|${sameItem.time}`).set(item);
      actions.removeItemSuccess({ id, uid });
      return true;
    }

    yield ref.child(`${id}|${sameItem.time}`).set({});
    actions.removeItemSuccess({ id, uid });
    return true;
  }

  console.error(`removeItem error: User '${uid}' doesn't have item '${id}'`);
  actions.notify({ message: 'Предмета нет в инвентаре' });
  actions.removeItemFail({ id, uid, error: 'has-no-item' });
  return false;
}

function* getInventoryItem(payload: IPayload) {
  const { id, uid } = payload;

  const rawItems = yield database
    .ref('users')
    .child(uid)
    .child('inventory')
    .once('value');
  const items: IInventoryItem[] = Object.values(rawItems.val() || {});
  if (items.length) {
    // @ts-ignore
    const item: IItem = items.find(item => item.id === id);
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

  const time = new Date().getTime();
  const item: IInventoryItem = { id, time, type: itemType, amount: amount };

  if (itemType !== 'weapon' && itemType !== 'wearable') {
    const sameItem = yield getInventoryItem({ id, uid });
    if (sameItem) {
      item.amount = (sameItem.amount || 1) + amount;
      item.time = sameItem.time;
    }
  }

  const fullId = `${item.id}|${item.time}`;
  yield database
    .ref('users')
    .child(uid)
    .child('inventory')
    .child(fullId)
    .set(item);

  actions.giveItemSuccess({ id, uid });
  return true;
}

function* takeItem(payload: IPayload) {
  const { uid, message } = payload;
  const item = message.data.item;

  message.data.taken = true;

  const took = yield changeMessage({ uid, message });
  if (took && item) {
    yield giveItem({
      id: item.id,
      uid,
      amount: item.amount,
      itemType: item.type,
    });
    actions.sendMessage({
      uid,
      message: `*подобрал ${item.name} ${item.amount >= 2 ? `(${item.amount}шт)` : ''}`,
    });
    actions.takeItemSuccess({});
    return true;
  }

  console.error('takeItem error. Cant take or no item', payload);
  actions.takeItemFail({});
  return false;
}

export default function* watchForActions() {
  yield all([
    takeLatest('DELETE_ITEM', deleteItem),
    takeLatest('GIVE_ITEM', giveItem),
    takeLatest('REMOVE_ITEM', removeItem),
    takeLatest('PASS_ITEM', passItem),
    takeLatest('TAKE_ITEM', takeItem),
  ]);
}
