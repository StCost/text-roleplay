import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';

import '../styles/use-info.scss';
import Avatar from './Avatar';
import { IUser } from '../reducers/interfaces';
import { getUserStatus } from '../helpers/utils';

interface IUserInfoProps {
  user: IUser;
  displayOnline?: boolean;
  onClick?: (user: IUser) => void;
}

const UserInfo = (props: IUserInfoProps) => {
  const { user, displayOnline, onClick } = props;

  return (
    <div className="user-info">
      <Tooltip
        title={user.lastOnline ? `Последняя активность: ${moment(user.lastOnline).fromNow()}` : undefined}
        placement="left"
      >
        <div
          className={`user-info-title ${getUserStatus(user)} ${onClick ? 'interactive' : ''}`}
          onClick={() => onClick && onClick(user)}
        >
          <Avatar
            avatar={user.avatar}
            nickname={user.nickname || user.uid}
          />
          <div className="user-info-nickname">
            {user.nickname || user.uid}
          </div>
        </div>
      </Tooltip>
      {displayOnline && (
        <span>
          {!!user.lastOnline && `Последняя активность: ${moment(user.lastOnline).fromNow()}`}
        </span>
      )}
    </div>
  );
};

export default UserInfo;
