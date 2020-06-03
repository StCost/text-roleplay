import React, { Component } from 'react';
import { HashRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import 'antd/dist/antd.css';

import Menu from './components/Menu';
import Router from './components/Router';

import './App.css';
import './styles/antd-dark.scss';
import './styles/components.scss';
import { IState } from './reducers/interfaces';
import actions from './reducers/actions';
import ErrorBoundary from './components/ErrorBoundary';

// @ts-ignore
const buildDate = (<div className="build-date">build date {window.buildDate.replace('_', ' ')}</div>);
moment().locale('ru');

class App extends Component<{ redirect?: string; notify?: string }> {
  componentDidUpdate = () => {
    const { notify, redirect } = this.props;

    if (notify) {
      message.info(notify);
      actions.notifySuccess({});
    }
    if (redirect) {
      actions.redirectSuccess({});
    }
  };

  getRedirect = () => {
    const { redirect } = this.props;
    return redirect && <Redirect to={redirect}/>;
  };

  render = () => {
    return (
      <ErrorBoundary>
        {buildDate}
        <HashRouter>
          {this.getRedirect()}
          <Menu/>
          <div className="app">
            <Router/>
          </div>
        </HashRouter>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state: IState) => ({ redirect: state.redirect, notify: state.notify });
export default connect(mapStateToProps)(App);
