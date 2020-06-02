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
}

const requestedUsers: { [key: string]: true } = {};

function* getUser(payload: IPayload) {
  const { uid, currentUser } = payload;

  if (requestedUsers[uid] && !currentUser) {
    actions.getUserFail({ uid, error: 'User is already listened', requestedUsers });
    return;
  }
  requestedUsers[uid] = true;
  const ref = database
    .ref('users')
    .child(uid);

  yield ref.once('value', (rawUser) => {
    const user = rawUser.val();
    if (!user) {
      actions.getUserFail({ ...payload, error: 'User does not exist' });
      return;
    }
    actions.getUserSuccess({ uid, user });

    ref.on('child_changed', (rawProperty) => {
      const key: string | null = rawProperty.key;
      if (!key) return;

      const value = rawProperty.val();
      actions.getUserSuccess({ uid, updatedData: { [key]: value } })
    });
  });
}

function* getAllUsers() {
  const rawUsers = yield database.ref('users').once('value');
  const users = rawUsers.val() || {};
  actions.getAllUsersSuccess({ users });

  Object.keys(users).forEach((uid: string) => {
    database
      .ref('users')
      .child(uid)
      .on('child_changed', (rawProperty) => {
        requestedUsers[uid] = true;
        const key: string | null = rawProperty.key;
        if (!key) return;

        const value = rawProperty.val();
        actions.getUserSuccess({ uid, updatedData: { [key]: value } })
      });
  })
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

function* fullDeleteUser(payload: IPayload) {
  const { uid } = payload;

  yield database.ref('users').child(uid).set({});
  yield database.ref('characters').child(uid).set({});
  actions.redirect({ to: '/chat' });
  actions.notify({ message: 'Пользователь успешно удалён' });
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_USER', getUser),
    takeLatest('SET_USER', setUser),
    takeLatest('UPDATE_LAST_ONLINE', updateLastOnline),
    takeEvery('SET_USER_STATUS', setUserStatus),
    takeEvery('GET_ALL_USERS', getAllUsers),
    takeEvery('FULL_DELETE_USER', fullDeleteUser),
  ]);
}
