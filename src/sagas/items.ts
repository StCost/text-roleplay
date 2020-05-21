import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { IPayload } from '../actions';
import actions from '../actions';
import { database } from '../helpers/firebase';
import { generateID } from '../helpers/utils';
import { IInventory, IInventoryItem, IItem } from "../reducers/interfaces";

function* setItem(payload: IPayload) {
  const { item } = payload;
  const time = new Date().getTime();
  const id = item.id || generateID();
  const author = localStorage.getItem('uid');

  const itemData = {
    ...item,
    id,
    time,
    author,
  };

  yield database
    .ref('items')
    .child(`${id}`)
    .set(itemData);

  actions.setItemSuccess({ itemData });
  actions.getItemById({ id });
}

function* getItems() {
  const rawItems = yield database
    .ref('items')
    .orderByKey()
    .limitToFirst(30)
    .once('value');

  const items = Object.values(rawItems.val() || {});
  actions.getItemsSuccess({ items });
}

function* getItemById(payload: IPayload) {
  const { id } = payload;

  const rawItem = yield database
    .ref('items')
    .child(id)
    .once('value');

  const item = rawItem.val();
  actions.getItemsSuccess({ items: [item] });
}

function* getMoreItems(payload: IPayload) {
  const { amount = 1, lastItem } = payload;

  const rawItems = yield database
    .ref('items')
    .orderByKey()
    .startAt(`${lastItem.id}`)
    .limitToFirst(amount + 1)
    .once('value');

  const a = rawItems.val();
  console.log(a);
  const items = Object.values(a || {}).splice(1);
  actions.getItemsSuccess({ items });
}

function* deleteItem(payload: IPayload) {
  const { id } = payload;

  yield database
    .ref('items')
    .child(id)
    .remove();

  actions.deleteItemSuccess({ id });
}

function* passItem(payload: IPayload) {
  const { id, uid, demonstrate, use } = payload;

  if (id && uid) {
    if (demonstrate) {
      actions.sendMessage({
        uid,
        message: '*показывает предмет',
        data: { itemId: id },
      });
      actions.passItemSuccess({});
      return;
    } else if (use) {
      const removed = yield removeItem({ id, uid });
      if (removed) {
        actions.sendMessage({
          uid,
          message: '*использовал предмет',
          data: { itemId: id },
        });
        actions.passItemSuccess({});
      }
    }
  }

  // if (passTo) {
  //   const removed = yield removeItem({ id, uid });
  //   if (!removed) {
  //     actions.passItemFail({ id, uid, passTo });
  //     console.error(`Pass item error`);
  //     return false;
  //   }
  // }
}

function* removeItem(payload: IPayload) {
  const { id, uid, all } = payload;
  const ref = database
    .ref(`users`)
    .child(uid)
    .child('inventory')

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

  console.error(`Remove item error: User '${uid}' doesn't have item '${id}'`);
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
  const { id, uid, itemType } = payload;
  if (!id || !uid || !itemType) {
    console.error('Cant give item. One of properties are not defined', id, uid, itemType);
    actions.giveItemFail({});
    return;
  }

  const time = new Date().getTime();
  const item: IInventoryItem = { id, time, type: itemType, amount: 1 };

  if (itemType !== 'weapon' && itemType !== 'wearable') {
    const sameItem = yield getInventoryItem({ id, uid });
    if (sameItem) {
      item.amount = (sameItem.amount || 1) + 1;
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

export default function* watchForActions() {
  yield all([
    takeLatest('SET_ITEM', setItem),
    takeLatest('GET_ITEMS', getItems),
    takeLatest('GET_MORE_ITEMS', getMoreItems),
    takeEvery('GET_ITEM_BY_ID', getItemById),
    takeLatest('DELETE_ITEM', deleteItem),
    takeLatest('GIVE_ITEM', giveItem),
    takeLatest('REMOVE_ITEM', removeItem),
    takeLatest('PASS_ITEM', passItem),
  ]);
}
