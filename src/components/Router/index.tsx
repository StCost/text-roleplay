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
  return (
    <Switch>
      {
        routes.map((value: IRoute) =>
          <Route
            key={value.path}
            path={value.path}
            component={props.isLoggedIn
              ? value.component
              : Login
            }
          />
        )
      }
      <Redirect
        from="/"
        to="/chat"
        exact
      />
      <Redirect
        from="/text-roleplay"
        to="/chat"
        exact
      />
      <Route path="*">
        <Card>
          <Empty description="404 страница не найдена"/>
          <br/>
          <Card.Meta description={
            <Link to='/chat'>
              <Button
                type='primary'
                style={{ width: '100%' }}
              >
                Go to working page
              </Button>
            </Link>
          }/>
        </Card>
      </Route>
    </Switch>
  );
}

export default connect(mapLoggedToProps)(Router);
