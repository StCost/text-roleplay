import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';

import '../styles/active-users.scss';
import { IUsers, IUser, IState } from '../reducers/interfaces';
import actions from '../reducers/actions';
import UserInfo from './UserInfo';

interface IUsersListProps {
  uid: string;
  loading: boolean;
  users: IUsers;
  onClick?: (user: IUser) => void;
  displayOnline?: boolean;
}

class UsersList extends Component<IUsersListProps> {
  componentDidMount = () => {
    actions.getAllUsers({});
  };

  render = () => {
    const { users, onClick, displayOnline } = this.props;

    return (
      <Menu
        className="active-users"
        selectedKeys={[]}
      >
        {Object
          .values(users)
          .sort((a: IUser, b: IUser) => a.nickname && a.nickname < b.nickname ? 1 : -1)
          .sort((user: IUser) => user.approved ? -1 : 1)
          .map((user: IUser) => (
            <Menu.Item
              className="active-users__item"
              key={user.uid}
              onClick={() => onClick && onClick(user)}
            >
              <UserInfo
                user={user}
                displayOnline={displayOnline}
              />
            </Menu.Item>
          ))}
      </Menu>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { uid, loading, users } = state;

  return {
    users,
    uid,
    loading,
  }
};

export default connect(mapStateToProps)(UsersList);
