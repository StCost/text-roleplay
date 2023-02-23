import { all, takeLatest } from 'redux-saga/effects';

import firebase from 'firebase/app';
import { IPayload } from '../reducers/actions';
import actions from '../reducers/actions';
import { database, messaging } from '../helpers/firebase';
import { formatMessage } from '../helpers/utils';
import config from '../configs/firebase.json';
import {IMessage} from "../reducers/interfaces";

function* sendMessage(payload: IPayload) {
  const { uid, message, data = {} } = payload;
  const time = Date.now();

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

const handleNotifications = async () => {
  await Notification.requestPermission();
  if (config["publickVapidKey"] && Notification.permission === 'granted') {
    messaging.usePublicVapidKey(config["publickVapidKey"]);
    const token = await messaging.getToken();
    const uid = localStorage.getItem('uid');

    const name = uid + '___' + navigator.userAgent.replace(/[.$[\]/]/g, '_');

    await database.ref('tokens').child(name).set(token);
  }
}

let subscribed = false;
function subscribe() {
  if (subscribed) return;

  handleNotifications();

  actions.getMessages({});
  const handleMessage = (rawMessage: firebase.database.DataSnapshot) => {
    const message = rawMessage.val();
    if (!message) return;

    actions.getMessagesSuccess({
      messages: [message],
      concat: true
    });

    if (document.hidden || !document.hasFocus() || window.location.hash !== '#/chat')
      actions.setUnreadMessage({ unreadMessage: true });
  };

  const removedMessage = (rawMessage: firebase.database.DataSnapshot) => {
    const key = rawMessage.key;
    if (!key) return;

    actions.removeMessageSuccess({ id: key });
  };

  subscribed = true;
  database
    .ref('messages')
    .orderByKey()
    .startAt(`${Date.now()-30000}`)// Without subtracting this time - you might not load messages. Probably because of time difference between different computers
    .on('child_added', handleMessage);

  database
    .ref('messages')
    .on('child_changed', handleMessage);

  database
    .ref('messages')
    .on('child_removed', removedMessage);
}

function unsubscribe() {
  database.ref('messages').off();
  subscribed = false;
}

function* getMessages() {
  // @ts-ignore
  const rawMessages = yield database
    .ref('messages')
    .orderByKey()
    .limitToLast(30)
    .once('value');

  const messages: IMessage[] = Object.values(rawMessages.val() || {});

  // let removed = 0;
  // messages.forEach(m => {
  //   if (m.body == "%Их ответ: ") {
  //     actions.removeMessage({ id: m.time });
  //     removed++;
  //   }
  // })
  //
  // if (removed > 0) {
  //   setTimeout(( ) => {
  //   actions.getMessages({});
  //   }, 50)
  // }

  actions.getMessagesSuccess({ messages });
}

function* getMoreMessages(payload: IPayload) {
  const { firstMessage } = payload;

  // @ts-ignore
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
  const { file, onFinish, onFail } = payload;

  try {
    const request = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('image', file);

    request.open('POST', 'https://api.imgur.com/3/image/');
    request.setRequestHeader('Authorization', `Client-ID ea2c833b74d4583`);
    request.onreadystatechange = () => {
      if (request.status === 200 && request.readyState === 4) {
        let res = JSON.parse(request.responseText);

        onFinish(res.data.link);
        actions.uploadFileSuccess({});
      } else if (request.status >= 400 && request.readyState === 4) {
        actions.notify({ message: 'Изображение не было загружено! ' +request.responseText });
        console.error(request.responseText);
        onFail();
        actions.uploadFileFail({ error: request.responseText });
      }
    };
    request.onerror = () => {
      console.log('onerror');
      actions.notify({ message: 'Изображение не было загружено! Проверьте консоль' });
      console.error(request.responseText);
      onFail();
      actions.uploadFileFail({ error: request.responseText });
    }

    request.send(formData);
  } catch (error) {
    actions.notify({ message: 'Изображение не было загружено! Проверьте консоль' });
    console.error(error);
    onFail();
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
  return newMessage;
}

let blinking = false;

export function setUnreadMessage(payload: IPayload) {
  const { unreadMessage } = payload;
  if (unreadMessage === false) return;

  if (document.visibilityState !== 'visible' || window.location.hash !== '#/chat') {
    const audio: HTMLAudioElement | null = document.body.querySelector('audio#notification');
    if (audio) {
      const volume = parseInt(localStorage.getItem('notificationVolume') || '50');
      if (volume > 0) {
        audio.volume = volume / 100;
        audio.play();
      }
    }
  }

  if (blinking) return;
  blinking = true;

  const interval = setInterval(() => {
    const title = document.head.querySelector('title');
    const link: HTMLLinkElement | null = document.head.querySelector('link#favicon');
    if (title && link) {
      title.innerText = title.innerText === 'TRP' ? 'TRP New Message!' : 'TRP';
      link.href = title.innerText === 'TRP' ? './regular.png' : './bright.png';

      if (!blinking || (document.visibilityState === 'visible' && window.location.hash === '#/chat')) {
        clearInterval(interval);
        blinking = false;
        actions.setUnreadMessage({ unreadMessage: false });
        title.innerText = 'TRP';
        link.href = 'regular.png';
      }
    }
  }, 1000);
}

function* removeMessage(payload: IPayload) {
  const { id } = payload;

  yield database.ref(`messages/${id}`).remove();
}

function* setIsTyping(payload: IPayload) {
  if (payload.isTyping !== undefined && payload.uid)
    yield database.ref(`users/${payload.uid}/isTyping`).set(payload.isTyping);
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
    takeLatest('REMOVE_MESSAGE', removeMessage),
    takeLatest('SET_IS_TYPING', setIsTyping),
  ]);
}
