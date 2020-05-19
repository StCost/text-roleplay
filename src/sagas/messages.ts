import { all, takeLatest } from 'redux-saga/effects';

import { IPayload } from '../actions';
import actions from '../actions';
import { database } from '../helpers/firebase';
import { formatMessage } from '../helpers/utils';

function* sendMessage(payload: IPayload) {
  const { uid, message } = payload;
  const time = new Date().getTime();

  try {
    yield database
      .ref('messages')
      .child(`${time}`)
      .set(formatMessage({
        time,
        author: uid,
        body: `${message} `,
      }));
    localStorage.setItem('message', '');
    actions.sendMessageSuccess({});
  } catch (error) {
    console.error(error);
    actions.sendMessageFail({ error });
  }
}

function subscribe() {
  database
    .ref('messages')
    .orderByKey()
    .limitToLast(1)
    .on('value', (rawMessages) => {
      const messages = Object.values(rawMessages.val() || {});
      actions.getMessagesSuccess({
        messages,
        concat: true
      });
    });
}

function unsubscribe() {
  database.ref('messages').off();
}

function* getMessages() {
  const rawMessages = yield database
    .ref('messages')
    .orderByKey()
    .limitToLast(30)
    .once('value');

  const messages = Object.values(rawMessages.val() || {});
  actions.getMessagesSuccess({ messages });
}

function* getMoreMessages(payload: IPayload) {
  const { firstMessage } = payload;

  const rawMessages = yield database
    .ref('messages')
    .orderByKey()
    .endAt(`${firstMessage.time}`)
    .limitToLast(30)
    .once('value');

  const messages = Object.values(rawMessages.val() || {});
  actions.getMessagesSuccess({ messages, concat: true });
}

function uploadFile(payload: IPayload) {
  const { file, uid } = payload;

  const request = new XMLHttpRequest();
  const formData = new FormData();

  formData.append('image', file);

  request.open('POST', 'https://api.imgur.com/3/image/');
  request.setRequestHeader('Authorization', `Client-ID ea2c833b74d4583`);
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      let res = JSON.parse(request.responseText);

      actions.sendMessage({
        uid,
        message: res.data.link,
      });
    }
  };

  request.send(formData);
}

export default function* watchForActions() {
  yield all([
    takeLatest('SEND_MESSAGE', sendMessage),
    takeLatest('GET_MESSAGES', getMessages),
    takeLatest('GET_MORE_MESSAGES', getMoreMessages),
    takeLatest('SUBSCRIBE', subscribe),
    takeLatest('UNSUBSCRIBE', unsubscribe),
    takeLatest('UPLOAD_FILE', uploadFile),
  ]);
}
