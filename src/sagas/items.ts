import { all, takeLatest } from 'redux-saga/effects';

import { IPayload } from '../actions';
import actions from '../actions';
import { database } from '../helpers/firebase';
import { generateID } from '../helpers/utils';

function* createItem(payload: IPayload) {
  const { item } = payload;
  const time = new Date().getTime();
  const id = generateID();
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
    actions.createItemSuccess({ itemData });
}

function* getItems() {
  const rawItems = yield database
    .ref('items')
    .orderByKey()
    .limitToLast(30)
    .once('value');

  const items = Object.values(rawItems.val() || {});
  actions.getItemsSuccess({ items });
}

function* getItemsById(payload: IPayload) {
  const itemsRef = database.ref('items');
  const rawItems = yield all(payload.items.map((item: string) => itemsRef.child(item).once('value')));
  const items = rawItems.map((item: any) => item.val());
  actions.getItemsSuccess({ items });
}

function* getMoreItems(payload: IPayload) {
  const { firstItem } = payload;

  const rawItems = yield database
    .ref('items')
    .orderByKey()
    .endAt(`${firstItem.id}`)
    .limitToLast(30)
    .once('value');

  const items = Object.values(rawItems.val() || {});
  actions.getItemsSuccess({ items, concat: true });
}

export default function* watchForActions() {
  yield all([
    takeLatest('CREATE_ITEM', createItem),
    takeLatest('GET_ITEMS', getItems),
    takeLatest('GET_MORE_ITEMS', getMoreItems),
    takeLatest('GET_ITEMS_BY_ID', getItemsById),
  ]);
}
