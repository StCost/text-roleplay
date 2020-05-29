import { all, takeLatest } from 'redux-saga/effects';

import { auth, database } from '../helpers/firebase';
import actions, { IPayload } from '../reducers/actions';
import { defaultUser } from "../reducers/interfaces";

function* login(payload: IPayload) {
  const { email, password } = payload;

  try {
    const user = yield auth.signInWithEmailAndPassword(email, password);
    actions.loginSuccess({ user });
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('uid', user.user.uid);
    return user.user;
  } catch (error) {
    actions.loginFail({ error });
    return false;
  }
}

function* register(payload: IPayload) {
  const { email, password, passwordConfirm, nickname } = payload;

  if (password !== passwordConfirm) {
    actions.registerFail({ error: { message: 'Пароли не совпадают!' } });
    return;
  }

  try {
    yield auth.createUserWithEmailAndPassword(email, password);
    actions.registerSuccess({});
    const user = yield login(payload);
    if (user) {
      const { uid } = user;
      yield database
        .ref(`users/${uid}`)
        .set({
          ...defaultUser,
          uid,
          nickname,
          lastOnline: Date.now(),
          status: 'online',
        });
      actions.getUser({ uid, currentUser: true });
      actions.sendMessage({ uid, message: '*[Новый пользователь зарегистрирован]*' });
    }
  } catch (error) {
    console.error(error);
    actions.registerFail({ error });
  }
}

function* resetPassword(payload: IPayload) {
  const { email } = payload;
  try {
    yield auth.sendPasswordResetEmail(email);
    actions.resetPasswordSuccess({});
    actions.notify({ message: 'Ссылка отправлена на E-mail!' });
  } catch (error) {
    console.error(error);
    actions.resetPasswordFail({ error });
  }
}


function* logout() {
  const uid = localStorage.getItem('uid');
  actions.setUserStatus({ uid, status: 'offline' });

  localStorage.removeItem('user');
  localStorage.removeItem('uid');
  localStorage.removeItem('loggedIn');
  yield auth.signOut();
}

function loginSuccess() {
  actions.getMessages({});
  actions.subscribe({});
}

export default function* watchForActions() {
  yield all([
    takeLatest('LOGIN', login),
    takeLatest('REGISTER', register),
    takeLatest('RESET_PASSWORD', resetPassword),
    takeLatest('LOGOUT', logout),
    takeLatest('LOGIN_SUCCESS', loginSuccess),
  ])
}
