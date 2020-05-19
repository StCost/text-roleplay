import { AnyAction } from 'redux';
import { all, takeLatest } from 'redux-saga/effects';

import { auth } from '../helpers/firebase';
import actions from '../actions';

function* login(action: AnyAction) {
  const { email, password } = action;

  try {
    const user = yield auth.signInWithEmailAndPassword(email, password);
    actions.loginSuccess({ user });
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('uid', user.user.uid);
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

export default function* watchForActions() {
  yield all([
    takeLatest('LOGIN', login),
    takeLatest('LOGOUT', logout),
  ])
}
