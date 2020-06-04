import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Card } from 'antd';

import UsersList from './UsersList';
import { IUser } from '../reducers/interfaces';

const Users = (props: RouteComponentProps) => (
  <Card title="Список пользователей">
    <UsersList
      onClick={(user: IUser) => props.history.push(`/${user.uid}/stats`)}
      displayOnline={true}
    />
  </Card>
);

export default withRouter(Users);
