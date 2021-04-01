import { all, takeLatest } from 'redux-saga/effects';

import { IPayload } from '../reducers/actions';
import { IMessage } from '../reducers/interfaces';

function* sendMessageSuccess(payload: IPayload) {
  const message: IMessage = payload.message;
}

export default function* watchForActions() {
  yield all([
    takeLatest('SEND_MESSAGE_SUCCESS', sendMessageSuccess),
  ]);
}
