import _firebase from 'firebase';

import firebaseConfig from '../configs/firebase.json';
import actions from '../actions';

const firebase = _firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

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
