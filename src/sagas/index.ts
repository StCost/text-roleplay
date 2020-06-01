import { all } from 'redux-saga/effects';

import auth from './auth';
import users from './users';
import messages from './messages';
import items from './items';
import inventory from './inventory';
import character from './character';

export default function* watchAll() {
  yield all([
    auth(),
    users(),
    messages(),
    items(),
    inventory(),
    character(),
  ])
}
