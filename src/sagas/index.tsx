import { all } from 'redux-saga/effects';

import auth from './auth';
import users from './users';
import messages from './messages';

export default function* watchAll() {
  yield all([
    auth(),
    users(),
    messages(),
  ])
}
