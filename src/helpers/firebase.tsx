import _firebase from 'firebase';

import firebaseConfig from '../configs/firebase.json';
import actions from '../actions';

const firebase = _firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

auth.onAuthStateChanged((user) => {
  if (user) {
    actions.loginSuccess({ user });
  } else {
    actions.logout({});
  }
});

export const signUp = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password)
};

export const signIn = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password)
};

export const signOut = () => {
  return auth.signOut();
};

export const getDashboard = () => {
  return database.ref('dashboard').once('value', );
};
export const getSettings = () => {
  return database.ref('settings').once('value', );
};

export default firebase;
