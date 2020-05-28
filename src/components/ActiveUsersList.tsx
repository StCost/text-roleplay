import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import '../styles/active-users.scss';
import { IUsers, IUser, IState } from '../reducers/interfaces';
import actions from '../reducers/actions';
import { isOnline } from '../helpers/utils';
import Avatar from './Avatar';

interface IActiveUsersListProps {
  activeUsers: string[];
  uid: string;
  loading: boolean;
  users: IUsers;
  onClick: (user: IUser) => void;
}

class ActiveUsersList extends Component<IActiveUsersListProps> {
  componentDidMount = () => {
    actions.getUsersActivity({});
  };

  componentDidUpdate = () => {
    const { activeUsers, users, loading } = this.props;

    if (!loading && activeUsers.length > 0) {
      activeUsers.forEach((uid: string) => {
        if (!users[uid])
          actions.getUser({ uid });
      });
    }
  };

  render = () => {
    const { activeUsers, users, onClick } = this.props;

    const validUsers = activeUsers
      .filter((uid: string) => users[uid] && users[uid].uid)
      .map((uid: string) => users[uid]);

    return (
      <Menu className="active-users">
        {validUsers.map((user: IUser) => (
          <div
            className="active-users__item"
            key={user.uid}
            onClick={() => onClick(user)}
          >
              <div className={`active-users__body ${isOnline(user.lastOnline) ? 'online' : ''}`}>
                <Avatar
                  avatar={user.avatar}
                  nickname={user.nickname}
                />
                <div className="active-users__nickname">
                  {user.nickname || user.uid}
                </div>
              </div>
              {user.lastOnline && (
                <div className="active-users__online">
                  {moment(user.lastOnline).fromNow()}
                </div>
              )}
          </div>
        ))}
      </Menu>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { usersActivity, uid, loading, users } = state;

  return {
    users,
    activeUsers: Object.keys(usersActivity),
    uid,
    loading,
  }
};

export default connect(mapStateToProps)(ActiveUsersList);
