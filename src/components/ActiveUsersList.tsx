import React, { Component } from 'react';
import { Menu } from 'antd';

import { IMessage, IUsers, IUser, IState } from '../reducers/interfaces';
import { connect } from "react-redux";
import actions from "../reducers/actions";

interface IActiveUsersListProps {
  usersActivity: {[key: string]: string};
  uid: string;
  loading: boolean;
  users: IUsers;
}

class ActiveUsersList extends Component<IActiveUsersListProps> {
  componentDidMount = () => {
    actions.getUsersActivity({});
  };

  componentDidUpdate = () => {
    const { usersActivity, users } = this.props;

  };

  render = () => {
    const { usersActivity, users } = this.props;
    console.log(usersActivity)
    return (
      <Menu>
        {[].map((u: IUser) => (
          <Menu.Item key={u.uid}>
            {u.uid}
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { usersActivity, uid, loading, users } = state;

  return {
    users,
    usersActivity,
    uid,
    loading,
  }
};

export default connect(mapStateToProps)(ActiveUsersList);
