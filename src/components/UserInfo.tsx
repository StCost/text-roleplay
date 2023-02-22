import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';

import '../styles/user-info.scss';
import Avatar from './Avatar';
import { IUser } from '../reducers/interfaces';
import { getUserStatus } from '../helpers/utils';

interface IUserInfoProps {
  user: IUser | null;
  displayOnline?: boolean;
  onClick?: (user: IUser) => void;
}

const UserInfo = (props: IUserInfoProps) => {
  const { user, displayOnline, onClick } = props;

  return (
    <div className="user-info">
      <Tooltip
        title={(user && user.lastOnline) ? `Последняя активность: ${moment(user.lastOnline).fromNow()}` : undefined}
        placement="left"
      >
        <div
          className={`user-info-title ${getUserStatus(user)} ${(onClick && user) ? 'interactive' : ''}`}
          onClick={() => onClick && user && onClick(user)}
        >
          <Avatar
            avatar={user ? user.avatar : ''}
            size={26}
            // eslint-disable-next-line
            nickname={user && (user.nickname || user.uid) || ''}
          />
          <div className="user-info-nickname">
            {
              // eslint-disable-next-line
              user && (user.nickname || user.uid) || '[Loading...]'
            }
          </div>
        </div>
      </Tooltip>
      {displayOnline && (
        <span>
          {
            // eslint-disable-next-line
            !!(user && user.lastOnline) && `Последняя активность: ${moment(user.lastOnline).fromNow()}`
          }
        </span>
      )}
    </div>
  );
};

export default UserInfo;
