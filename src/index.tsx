import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import saga from './sagas/index';
import store, { sagaMiddleware } from './helpers/store';
import * as serviceWorker from './serviceWorker';
import { messaging } from './helpers/firebase';

navigator.serviceWorker.register('./firebase-messaging-sw.js').then(registration => {
  messaging.useServiceWorker(registration);
})

sagaMiddleware.run(saga);
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
