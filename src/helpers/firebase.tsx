import {
  initializeApp,
  auth as fbAuth,
  database as fbDatabase
} from 'firebase';

import firebaseConfig from '../configs/firebase.json';
import actions from '../actions';

const firebase = initializeApp(firebaseConfig);
const auth = fbAuth();
const database = fbDatabase();

auth.onAuthStateChanged((user) => {
  if (user) {
    actions.loginSuccess({ user });
    actions.getSettings({ uid: user.uid });
  } else {
    actions.logout({});
  }
});

export {
  auth,
  database,
  firebase,
}
