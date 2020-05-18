import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import Menu from './components/Menu';
import Router from './components/Router';

import './App.css';
import './styles/antd-dark.scss';
import './styles/components.scss';
import { listenForActivity } from './helpers/utils';

function App() {
  listenForActivity();

  return (
    <BrowserRouter>
      <Menu/>
      <div className="app">
        <Router/>
      </div>
    </BrowserRouter>
  );
}

export default App;
