import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from '../reducers';
import reducers from '../reducers'

export const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

export default store;
