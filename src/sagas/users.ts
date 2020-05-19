import { all, takeLatest } from 'redux-saga/effects';

import { database } from '../helpers/firebase';
import actions, { IPayload } from '../actions/index';

function* setUser(payload: IPayload) {
  const { uid, user } = payload;

  yield database
    .ref('users')
    .child(uid)
    .set({
      ...user,
      lastOnline: new Date().getTime(),
      uid,
    });

  actions.setUserSuccess({});
  actions.getUser({ uid });
}

const requestedUsers: { [key: string]: true } = {};

function getUser(payload: IPayload) {
  const { uid, currentUser } = payload;

  if (requestedUsers[uid]) return;
  requestedUsers[uid] = true;
  database
    .ref('users')
    .child(uid)
    .on('value', (rawUser) => {
      const user = rawUser.val() || {};
      actions.getUserSuccess({ user, uid, currentUser });
    });
}

function* updateLastOnline() {
  const uid = localStorage.getItem('uid');
  if (!uid || uid === 'undefined') return;
  const time = new Date().getTime();

  localStorage.setItem('lastActivity', `${time}`);
  yield database
    .ref('users')
    .child(`${uid}`)
    .child('lastOnline')
    .set(time);
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_USER', getUser),
    takeLatest('SET_USER', setUser),
    takeLatest('UPDATE_LAST_ONLINE', updateLastOnline)
  ]);
}
