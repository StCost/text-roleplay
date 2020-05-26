import _firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from '../configs/firebase.json';
import actions from '../reducers/actions';

const firebase = _firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
auth.languageCode = 'ru';
const database = firebase.database();

auth.onAuthStateChanged((user) => {
  if (user) {
    actions.loginSuccess({ user });
    actions.getUser({ uid: user.uid, currentUser: true });
  } else {
    actions.logout({});
  }
});

export {
  auth,
  database,
  firebase,
}
