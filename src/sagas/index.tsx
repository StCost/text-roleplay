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

function* getMessages(payload: IPayload) {
  const { startFrom = 0 } = payload;

  try {
    const rawMessages = yield database
      .ref('messages')
      .orderByChild('time')
      .startAt(startFrom)
      .limitToLast(10)
      .once('value');

    const messages = rawMessages.val() || {};
    actions.getMessagesSuccess({ messages: Object.values(messages) });
  } catch (error) {
    console.error(error);
    actions.getMessagesFail({ error });
  }
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

  try {
    yield database
      .ref('messages')
      .push({
        author: uid,
        body: message,
        time: new Date().getTime(),
      });
    localStorage.setItem('message', '');
    actions.sendMessageSuccess({});
  } catch (error) {
    console.error(error);
    actions.sendMessageFail({ error });
  }
}

export default function* watchForActions() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('LOGOUT', logout);
  yield takeEvery('GET_MESSAGES', getMessages);
  yield takeEvery('GET_SETTINGS', getSettings);
  yield takeEvery('SET_SETTINGS', setSettings);
  yield takeEvery('SEND_MESSAGE', sendMessage);
}
