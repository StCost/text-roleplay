import React, { Component } from 'react';
import { HashRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { message, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import 'antd/dist/antd.css';

import Menu from './components/Menu';
import Router from './components/Router';

import './App.css';
import './styles/antd-dark.scss';
import './styles/components.scss';
import { defaultUser, IState, IUser } from './reducers/interfaces';
import actions from './reducers/actions';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';

// @ts-ignore
const buildDate = (<div className="build-date">build date {window.buildDate.replace('_', ' ')}</div>);
moment().locale('ru');

interface IAppProps {
  redirect?: string;
  notify?: string,
  loading: boolean
  currentUser: IUser | null;
}

class App extends Component<IAppProps> {
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

  getZoom = () => {
    const { currentUser } = this.props;
    return (currentUser && currentUser.zoom)
      ? currentUser.zoom
      : defaultUser.zoom;
  };

  render = () => {
    const { loading } = this.props;

    return (
      <ErrorBoundary>
        {buildDate}
        <Loader loading={loading}/>
        <HashRouter>
          {this.getRedirect()}
          <Menu/>
          <Spin spinning={loading}>
            <div
              className="app"
              style={{ zoom: `${this.getZoom()/100}` }}
            >
              <Router/>
            </div>
          </Spin>
        </HashRouter>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  redirect: state.redirect,
  notify: state.notify,
  loading: state.loading,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(App);
