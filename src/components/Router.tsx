import React, { lazy, Suspense } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Empty } from 'antd';

import routes, { IRoute } from '../configs/routes';
import Login from './Login';
import { IState } from '../reducers/interfaces';

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
      {routes.map((value: IRoute) => {
        const C = lazy(() => import(`../${value.component}`));
        const getComponent = () => (
          <Suspense
            key={value.path}
            fallback={<Empty description="Страница грузится..."/>}
          >
            <C/>
          </Suspense>
        );

        return (
          <Route
            key={value.path}
            path={value.path}
            exact={value.exact || false}
            component={getComponent}
          />
        )
      })}
      <Redirect to="/text-roleplay/chat"/>
    </Switch>
  );
}

export default connect((state: IState) => ({ isLoggedIn: state.isLoggedIn }))(Router);
