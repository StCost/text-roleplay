import { all, takeLatest } from 'redux-saga/effects';
import firebase from 'firebase/app';

import actions, { IPayload } from '../reducers/actions';
import { database } from '../helpers/firebase';
import { getInitialCharacter } from '../containers/Character/config';

const fetchedCharacters: string[] = [];

function getCharacter(payload: IPayload) {
  const { uid } = payload;

  if (fetchedCharacters.indexOf(uid) > -1) {
    console.error('Character already listened', uid);
    return;
  }

  const ref = database
    .ref('characters')
    .child(uid);

  const onUpdate = (rawChar: firebase.database.DataSnapshot) => {
    const { key } = rawChar;
    if (!key) return;
    const value = rawChar.val();
    const updatedData = { [key]: value === undefined ? '' : value };

    actions.getCharacterSuccess({ uid, updatedData });
  };

  actions.getCharacterSuccess({
    uid,
    updatedData: {
      ...getInitialCharacter(),
      uid,
    }
  });
  ref.on('child_changed', onUpdate);
  ref.on('child_added', onUpdate);
  ref.on('child_removed', onUpdate);
}

function* setCharacter(payload: IPayload) {
  const { uid, character } = payload;

  yield database
    .ref('characters')
    .child(uid)
    .set({
      ...character,
      uid,
    });
  actions.setCharacterSuccess({});
}

function* setCharacterNotes(payload: IPayload) {
  const { uid, notes } = payload;

  yield database
    .ref('characters')
    .child(uid)
    .child('notes')
    .set(notes);

  actions.setCharacterNotesSuccess({});
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_CHARACTER', getCharacter),
    takeLatest('SET_CHARACTER', setCharacter),
    takeLatest('SET_CHARACTER_NOTES', setCharacterNotes),
  ]);
}
