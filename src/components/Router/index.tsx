import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Empty, Card } from 'antd';

import routes, { IRoute } from '../../configs/routes';
import { mapLoggedToProps } from '../../helpers/utils';
import Login from "../Login";

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

export default connect(mapLoggedToProps)(Router);
