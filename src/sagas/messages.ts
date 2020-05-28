import { all, takeLatest } from 'redux-saga/effects';

import { IPayload } from '../reducers/actions';
import actions from '../reducers/actions';
import { database } from '../helpers/firebase';
import { formatMessage } from '../helpers/utils';

function* sendMessage(payload: IPayload) {
  const { uid, message, data = {} } = payload;
  const time = new Date().getTime();

  const newMessage = formatMessage({
    time,
    author: uid,
    body: `${message.replace(/\n/g, ' \n')} `,
    data,
  });

  try {
    yield database
      .ref('messages')
      .child(`${time}`)
      .set(newMessage);
    localStorage.setItem('message', '');
    actions.sendMessageSuccess({ message: newMessage });
  } catch (e) {
    actions.sendMessageFail({});
    console.error(e);
    actions.notify({ message: 'Сообщение не было отправлено. Для деталей ctrl + shift + i, вкладка Console' });
  }
}

let firstSkipped = false;

function subscribe() {
  database
    .ref('messages')
    .orderByKey()
    .limitToLast(1)
    .on('value', (rawMessages) => {
      if (!firstSkipped) {
        firstSkipped = true;
        return;
      }

      const messages = Object.values(rawMessages.val() || {});
      actions.getMessagesSuccess({
        messages,
        concat: true
      });

      actions.setUnreadMessage({ unreadMessage: true });
    });
}

function unsubscribe() {
  database.ref('messages').off();
}

function* getMessages() {
  const rawMessages = yield database
    .ref('messages')
    .orderByKey()
    .limitToLast(100)
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
  const { file, onFinish } = payload;

  try {
    const request = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('image', file);

    request.open('POST', 'https://api.imgur.com/3/image/');
    request.setRequestHeader('Authorization', `Client-ID ea2c833b74d4583`);
    request.onreadystatechange = () => {
      if (request.status === 200 && request.readyState === 4) {
        let res = JSON.parse(request.responseText);

        actions.uploadFileSuccess({});
        onFinish(res.data.link);
      }
    };

    request.send(formData);
  } catch (error) {
    actions.notify({ message: 'Изображение не было загружено! Проверьте консоль' });
    console.error(error);
    actions.uploadFileFail({ error });
  }
}

export function* changeMessage(payload: IPayload) {
  const { message } = payload;

  const newMessage = formatMessage(message);

  yield database
    .ref('messages')
    .child(`${message.time}`)
    .set(newMessage);

  actions.changeMessageSuccess({ message: newMessage });
  actions.getMessagesSuccess({ messages: [newMessage], concat: true });
  return newMessage;
}

let blinking = false;

export function setUnreadMessage(payload: IPayload) {
  const { unreadMessage } = payload;
  if (unreadMessage === false) return;

  if (blinking) return;
  blinking = true;

  const interval = setInterval(() => {
    const title = document.head.querySelector('title');
    if (title) {
      title.innerText = title.innerText === 'TRP' ? '(!) TRP' : 'TRP';

      if (!blinking || (document.visibilityState === 'visible' && window.location.pathname === '/text-roleplay/chat')) {
        title.innerText = 'TRP';
        clearInterval(interval);
        blinking = false;
        actions.setUnreadMessage({ unreadMessage: false });
      }
    }
  }, 1000);
}

export default function* watchForActions() {
  yield all([
    takeLatest('SEND_MESSAGE', sendMessage),
    takeLatest('GET_MESSAGES', getMessages),
    takeLatest('GET_MORE_MESSAGES', getMoreMessages),
    takeLatest('SUBSCRIBE', subscribe),
    takeLatest('UNSUBSCRIBE', unsubscribe),
    takeLatest('UPLOAD_FILE', uploadFile),
    takeLatest('CHANGE_MESSAGE', changeMessage),
    takeLatest('SET_UNREAD_MESSAGE', setUnreadMessage),
  ]);
}
