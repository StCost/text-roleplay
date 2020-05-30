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

  const { nickname = '', avatar = '', lastOnline = 0, status = 'offline' } = user;
  yield database
    .ref('users-base')
    .child(uid)
    .set({
      uid,
      nickname,
      avatar,
      lastOnline,
      status,
    });

  actions.setUserSuccess({});
}

const requestedUsers: { [key: string]: true } = {};

function getUser(payload: IPayload) {
  const { uid, currentUser } = payload;

  if (requestedUsers[uid] && !currentUser) {
    actions.getUserFail({ uid, error: 'User is already listened', requestedUsers });
    return;
  }
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
  const time = Date.now();

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
    .ref('users-base')
    .child(`${uid}`)
    .child('lastOnline')
    .set(time);
}

function* getUsersBase() {
  const rawUsers = yield database
    .ref('users-base')
    .once('value');

  const users = rawUsers.val();
  actions.getUsersBaseSuccess({ users });
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
    takeLatest('GET_USERS_BASE', getUsersBase),
    takeEvery('SET_USER_STATUS', setUserStatus),
  ]);
}
