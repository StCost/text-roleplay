import { takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { auth, database } from '../helpers/firebase';
import actions, { IPayload } from '../actions/index';

function* login(action: AnyAction) {
  const { email, password } = action;
  try {
    const user = yield auth.signInWithEmailAndPassword(email, password);
    actions.loginSuccess({ user });
    localStorage.setItem('user', JSON.stringify(user.user));
  } catch (error) {
    console.error(error);
    if (error.code === 'auth/user-not-found') {
      const user = auth.createUserWithEmailAndPassword(email, password);
      actions.loginSuccess({ user });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      actions.loginFail({ error });
    }
  }
}

function* logout() {
  localStorage.setItem('loggedIn', 'false');
  yield auth.signOut();
}

function* getSettings(payload: IPayload) {
  const { uid } = payload;

  try {
    const rawSettings = yield database
      .ref('settings')
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
      .ref('settings')
      .child(uid)
      .set(settings);

    actions.setSettingsSuccess({});
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
    .limitToLast(100)
    .on('value', (rawMessages) => {
      const messages = Object.values(rawMessages.val());
      actions.getMessagesSuccess({ messages });
    });
}

function unsubscribe() {
  database.ref('messages').off();
}

export default function* watchForActions() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('LOGOUT', logout);
  yield takeEvery('GET_SETTINGS', getSettings);
  yield takeEvery('SET_SETTINGS', setSettings);
  yield takeEvery('SEND_MESSAGE', sendMessage);
  yield takeEvery('SUBSCRIBE', subscribe);
  yield takeEvery('UNSUBSCRIBE', unsubscribe);
}
