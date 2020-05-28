import { all, takeLatest, takeEvery } from 'redux-saga/effects';

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
  const ref = database
    .ref('users')
    .child(uid);

  ref.once('value', (rawUser) => {
    const user = rawUser.val() || {};
    actions.getUserSuccess({ uid, user });
  });

  ref.on('child_changed', (rawProperty) => {
    const key: string | null = rawProperty.key;
    if (!key) return;

    const value = rawProperty.val();
    actions.getUserSuccess({ uid, updatedData: { [key]: value } })
  });
}

function* updateLastOnline() {
  const uid = localStorage.getItem('uid');
  if (!uid || uid === 'undefined') return;
  const time = new Date().getTime();

  localStorage.setItem('lastActivity', `${time}`);

  const ref = database
    .ref('users')
    .child(`${uid}`);

  yield ref
    .child('lastOnline')
    .set(time);

  yield ref
    .child('status')
    .set('online');

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

export function* setUserStatus(payload: IPayload) {
  const { uid, status } = payload;
  if (!uid || !status) {
    console.error('Uid or status not defined', payload);
    return;
  }

  yield database
    .ref(`users/${uid}/status`)
    .set(status);
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_USER', getUser),
    takeLatest('SET_USER', setUser),
    takeLatest('UPDATE_LAST_ONLINE', updateLastOnline),
    takeLatest('GET_USERS_ACTIVITY', getUsersActivity),
    takeEvery('SET_USER_STATUS', setUserStatus),
  ]);
}
