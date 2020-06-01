import { all, takeLatest } from 'redux-saga/effects';

import actions, { IPayload } from '../reducers/actions';
import { database } from '../helpers/firebase';
import { initialCharacter } from "../containers/Character/config";

const fetchedCharacters: string[] = [];
function* getCharacter(payload: IPayload) {
  const { uid } = payload;

  if (fetchedCharacters.indexOf(uid) > -1) {
    console.error('Character already listened', uid);
    return;
  }

  const ref = database
    .ref('characters')
    .child(uid);

  const rawChar = yield ref.once('value');
  const char = rawChar.val() || initialCharacter;

  actions.getCharacterSuccess({ uid, character: char });
  ref.on('child_changed', (rawChar) => {
    const { key } = rawChar;
    if (!key) return;
    const updatedData = {[key]: rawChar.val()};

    actions.getCharacterSuccess({ uid, updatedData });
  });
}

function* setCharacter(payload: IPayload) {
  const { uid, character } = payload;

  console.log(payload);
  yield database
    .ref('characters')
    .child(uid)
    .set(character);
  actions.setCharacterSuccess({});
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_CHARACTER', getCharacter),
    takeLatest('SET_CHARACTER', setCharacter),
  ]);
}
