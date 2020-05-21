import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { IPayload } from '../actions';
import actions from '../actions';
import { database } from '../helpers/firebase';
import { generateID } from '../helpers/utils';

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
    actions.getItemsById({ items: [id] });
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

  const rawItems = yield database
    .ref('items')
    .child(id)
    .once('value');

  const items = rawItems.val();
  actions.getItemsSuccess({ items: [items] });
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
  const { id, uid, passTo, demonstrate, use } = payload;

  if ([passTo, demonstrate, use].some(v => v)) {
    console.error();
  }

  if (passTo) {
    const removed = yield removeItem({ id, uid });
    if (!removed) {
      actions.passItemFail({ id, uid, passTo });
      console.error(`Pass item error`);
      return false;
    }
  }
}

function* removeItem(payload: IPayload) {
  const { id, uid } = payload;

  const rawItem = yield database
    .ref(`users/${uid}`)
    // @ts-ignore
    .where('inventory', 'in', id)
    .child(id)
    .once('value');

  if (rawItem.val()) {
    actions.removeItemSuccess({ id, uid });
    return true;
  } else {
    console.error(`Remove item error: User '${uid}' doesn't have item '${id}'`);
    actions.removeItemFail({ id, uid, error: 'has-no-item' });
    return false;
  }
}

function* giveItem(payload: IPayload) {
  const { id, uid } = payload;

  const time = new Date().getTime();
  yield database
    .ref('users')
    .child(uid)
    .child('inventory')
    .child(`${id}|${time}`)
    .set({ id, time });
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
