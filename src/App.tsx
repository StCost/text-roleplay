import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Menu from './components/Menu';
import Router from './components/Router';

import './App.css';
import 'antd/dist/antd.css';

function App() {
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
