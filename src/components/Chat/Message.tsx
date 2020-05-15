import React from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import { IMessage, ISettings } from '../../reducers';
import Avatar from '../Avatar';
import MessageBody from './MessageBody';
import {
  getDate,
  getFullTime,
  getTime,
  isOnline
} from '../../helpers/utils';

interface IMessageProps {
  message: IMessage,
  user: ISettings,
}

const Message = (props: IMessageProps) => {
  const {
    message: {
      time,
      body,
      grouped,
    },
    user,
  } = props;

  const title = user && (
    <Link to={`./user/${user.uid}`}>
      <Tooltip
        title={`Last activity: ${getFullTime(user.lastOnline)}`}
        placement="left"
      >
        <div className={`chat-message__title ${isOnline(user.lastOnline) ? 'online' : ''}`}>
          <Avatar
            avatar={user.avatar}
            nickname={user.nickname}
          />
          <div className="chat-message__nickname">
            {user.nickname}
          </div>
        </div>
      </Tooltip>
    </Link>
  );

  return (
    <Card
      className={`chat-message ${grouped ? 'grouped' : ''}`}
      title={title}
      key={time}
      extra={(
        <Tooltip title={getDate(time)}>
          <div className="chat-time">{getTime(time)}</div>
        </Tooltip>
      )}
    >
      <MessageBody message={body}/>
    </Card>
  );
};

export default Message;
