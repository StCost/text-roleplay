import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';
import 'antd/dist/antd.css';

import Menu from './components/Menu';
import Router from './components/Router';

import './App.css';
import './styles/antd-dark.scss';
import './styles/components.scss';
import { listenForActivity } from './helpers/activity';
import { IState } from './reducers/interfaces';
import actions from "./reducers/actions";

// @ts-ignore
const buildDate = (<div className="build-date">build date {window.buildDate.replace('_', ' ')}</div>);

class App extends Component<{ redirect?: string; notify?: string }> {
  componentDidMount = listenForActivity;

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
      <>
        {buildDate}
        <BrowserRouter>
          {this.getRedirect()}
          <Menu/>
          <div className="app">
            <Router/>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => ({ redirect: state.redirect, notify: state.notify });
export default connect(mapStateToProps)(App);
