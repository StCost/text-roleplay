import { takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { auth, database } from '../helpers/firebase';
import actions, { IPayload } from '../actions/index';

function* login(action: AnyAction) {
  const { email, password } = action;
  try {
    const user = yield auth.signInWithEmailAndPassword(email, password);
    actions.loginSuccess({ user });
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('uid', user.uid);
  } catch (error) {
    console.error(error);
    if (error.code === 'auth/user-not-found') {
      const user = yield auth.createUserWithEmailAndPassword(email, password);
      actions.loginSuccess({ user });
      localStorage.setItem('user', JSON.stringify(user.user));
      localStorage.setItem('uid', user.uid);
    } else {
      actions.loginFail({ error });
    }
  }
}

function* logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('uid');
  localStorage.removeItem('loggedIn');
  yield auth.signOut();
}

function* getSettings(payload: IPayload) {
  const { uid } = payload;

  try {
    const rawSettings = yield database
      .ref('users')
      .child(uid)
      .once('value');

    const settings = rawSettings.val();
    actions.getSettingsSuccess({ settings });
  } catch (error) {
    console.error(error);
    actions.getSettingsFail({ error });
  }
}

function* setSettings(payload: IPayload) {
  const { uid, settings } = payload;

  try {
    yield database
      .ref('users')
      .child(uid)
      .set({
        ...settings,
        uid,
      });

    actions.setSettingsSuccess({});
    actions.getSettings({ uid });
  } catch (error) {
    console.error(error);
    actions.setSettingsFail({ error });
  }
}

function* sendMessage(payload: IPayload) {
  const { uid, message } = payload;
  const time = new Date().getTime();

  try {
    yield database
      .ref('messages')
      .child(`${time}`)
      .set({
        time,
        author: uid,
        body: message,
      });
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
    .limitToLast(5)
    .once('value');

  const messages = Object.values(rawMessages.val() || {});
  actions.getMessagesSuccess({ messages, concat: true });
}

const requestedUsers: { [key: string]: true } = {};

function getUser(payload: IPayload) {
  const { uid } = payload;

  if (requestedUsers[uid]) return;
  requestedUsers[uid] = true;
  database
    .ref('users')
    .child(uid)
    .on('value', (rawUser) => {
      const user = rawUser.val() || {};
      actions.getUserSuccess({ user });
    });
}

function* updateLastOnline() {
  const uid = localStorage.getItem('uid');
  if (!uid) return;
  const time = new Date().getTime();

  localStorage.setItem('lastActivity', `${time}`);
  yield database
    .ref('users')
    .child(`${uid}`)
    .child('lastOnline')
    .set(time);
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
  yield takeLatest('LOGIN', login);
  yield takeLatest('LOGOUT', logout);
  yield takeLatest('GET_SETTINGS', getSettings);
  yield takeLatest('GET_USER', getUser);
  yield takeLatest('SET_SETTINGS', setSettings);
  yield takeLatest('SEND_MESSAGE', sendMessage);
  yield takeLatest('GET_MESSAGES', getMessages);
  yield takeLatest('GET_MORE_MESSAGES', getMoreMessages);
  yield takeLatest('SUBSCRIBE', subscribe);
  yield takeLatest('UPDATE_LAST_ONLINE', updateLastOnline);
  yield takeLatest('UNSUBSCRIBE', unsubscribe);
  yield takeLatest('UPLOAD_FILE', uploadFile);
}
