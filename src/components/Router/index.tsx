import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import routes, { IRoute } from '../../configs/routes';
import Login from '../Login';
import { IState } from "../../reducers";

interface IRouterProps {
  isLoggedIn: boolean;
}

function Router(props: IRouterProps) {
  if (!props.isLoggedIn) {
    return (
      <Switch>
        <Route
          path="*"
          component={Login}
        />
      </Switch>
    )
  }

  return (
    <Switch>
      {
        routes.map((value: IRoute) =>
          <Route
            key={value.path}
            path={value.path}
            component={value.component}
          />
        )
      }
      <Redirect to="/text-roleplay/chat"/>
    </Switch>
  );
}

export default connect((state: IState) => ({ isLoggedIn: state.isLoggedIn }))(Router);
