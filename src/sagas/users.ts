import { all, takeLatest } from 'redux-saga/effects';

import { database } from '../helpers/firebase';
import actions, { IPayload } from '../reducers/actions';

function* setUser(payload: IPayload) {
  const { uid, user } = payload;

  yield database
    .ref('users')
    .child(uid)
    .set({
      ...user,
      uid,
    });

  actions.setUserSuccess({});
  actions.getUser({ uid });
}

const requestedUsers: { [key: string]: true } = {};

function getUser(payload: IPayload) {
  const { uid, currentUser } = payload;

  if (requestedUsers[uid] && !currentUser) return;
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

  yield database
    .ref('usersActivity')
    .child(`${uid}`)
    .set(time);
}

function* getUsersActivity() {
  const rawActivity = yield database
    .ref('usersActivity')
    .once('value');

  const usersActivity = (rawActivity.val() || {});
  actions.getUsersActivitySuccess({ usersActivity });
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_USER', getUser),
    takeLatest('SET_USER', setUser),
    takeLatest('UPDATE_LAST_ONLINE', updateLastOnline),
    takeLatest('GET_USERS_ACTIVITY', getUsersActivity),
  ]);
}
