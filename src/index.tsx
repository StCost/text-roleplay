import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import saga from './sagas/index';
import store, { sagaMiddleware } from './helpers/store';
import * as serviceWorker from './serviceWorker';

sagaMiddleware.run(saga);
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
