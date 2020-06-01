import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase/app';

import { IPayload } from '../reducers/actions';
import actions from '../reducers/actions';
import { database } from '../helpers/firebase';
import { generateID, getFailedItem } from '../helpers/utils';
import { IInventoryItem, IMessage } from '../reducers/interfaces';
import { getRandomInt } from '../helpers/dice';
import { ICharacter } from "../containers/Character/config";

function* setItem(payload: IPayload) {
  const { item } = payload;
  const time = Date.now();
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

function subscribe() {
  const handleItem = (rawMessage: firebase.database.DataSnapshot) => {
    const item = rawMessage.val();
    if (!item) return;

    actions.getItemsSuccess({ items: [item] });
  };

  database
    .ref('items')
    .on('child_added', handleItem);
  database
    .ref('items')
    .on('child_changed', handleItem);
}

function unsubscribe() {
  database.ref('items').off();
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

  const item = rawItem.val() || getFailedItem(id);
  actions.getItemsSuccess({ items: [item] });
  return true;
}

function* getMoreItems(payload: IPayload) {
  const { amount = 1, lastItem } = payload;
  if (!lastItem) {
    actions.notify({ message: 'Список предметов пуст!' });
    console.error('No last item', payload);
    actions.getMoreItemsFail({});
    return;
  }

  const rawItems = yield database
    .ref('items')
    .orderByKey()
    .startAt(`${lastItem.id}`)
    .limitToFirst(amount + 1)
    .once('value');

  const items = Object.values(rawItems.val() || {}).splice(1);
  actions.getItemsSuccess({ items });
}

function* deleteItem(payload: IPayload) {
  const { id } = payload;

  // Delete items from items list
  yield database.ref(`items/${id}`).set({});
  actions.deleteItemProgress({ field: 'deleted', value: true });
  let waitCounter = 0;
  const getWait = () => {
    waitCounter += getRandomInt(10, 500);
    return waitCounter;
  };

  // Delete item from all messages
  const messages: IMessage[] = Object.values((yield database.ref(`messages`).once('value')).val() || {});
  let clearedMessages = 0;

  async function checkMessages(index: number) {
    const message: IMessage = messages[index];
    if (!message) return;
    const randomWait = getWait();

    setTimeout(() => actions.deleteItemProgress({
      field: 'messagesChecked',
      value: index + 1
    }), randomWait);
    if (message.data && message.data.itemId && message.data.itemId === id) {
      await database.ref(`messages/${message.time}/data`).set({});
      setTimeout(() => actions.deleteItemProgress({
        field: 'messagesCleared',
        value: ++clearedMessages
      }), randomWait);
    }
    await checkMessages(index + 1);
  }

  yield checkMessages(0);

  // Delete item from all users
  const chars: ICharacter[] = Object.values((yield database.ref(`characters`).once('value')).val() || {});
  let clearedUsers = 0;

  async function checkUsers(index: number) {
    const char: ICharacter = chars[index];
    if (!char) return;
    const randomWait = getWait();

    setTimeout(() => actions.deleteItemProgress({
      field: 'usersChecked',
      value: index + 1
    }), randomWait);
    if (char.inventory) {
      const item = Object.values(char.inventory).find((item: IInventoryItem) => item.id === id);
      if (item) {
        await database.ref(`character/${char.uid}/inventory/${id}|${item.time}`).set({});
        setTimeout(() => actions.deleteItemProgress({
          field: 'usersCleared',
          value: ++clearedUsers
        }), randomWait);
      }
    }
    await checkUsers(index + 1);
  }

  yield checkUsers(0);

  setTimeout(
    () => actions.deleteItemProgress({ field: 'done', value: true }),
    getWait()
  );
  actions.deleteItemSuccess({ id });
}

export default function* watchForActions() {
  yield all([
    takeLatest('DELETE_ITEM', deleteItem),
    takeLatest('SET_ITEM', setItem),
    takeLatest('GET_ITEMS', getItems),
    takeLatest('GET_MORE_ITEMS', getMoreItems),
    takeEvery('GET_ITEM_BY_ID', getItemById),
    takeLatest('SUBSCRIBE', subscribe),
    takeLatest('UNSUBSCRIBE', unsubscribe),
  ]);
}
