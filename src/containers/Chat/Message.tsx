import React from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import { IMessage, IUser } from '../../reducers/interfaces';
import Avatar from '../../components/Avatar';
import MessageBody from './MessageBody';
import {
  getDate,
  getFullTime,
  getTime,
  isOnline
} from '../../helpers/utils';

interface IMessageProps {
  message: IMessage,
  user: IUser,
}

const Message = (props: IMessageProps) => {
  const {
    message: {
      time,
      grouped,
      body,
      mentioned,
    },
    user,
  } = props;

  const title = user && (
    <Link to={`./${user.uid}/settings`}>
      <Tooltip
        title={user.lastOnline ? `Последняя активность: ${getFullTime(user.lastOnline)}` : undefined}
        placement="left"
      >
        <div className={`chat-message__title ${isOnline(user.lastOnline) ? 'online' : ''}`}>
          <Avatar
            avatar={user.avatar}
            nickname={user.nickname}
          />
          <div className="chat-message__nickname">
            {user.nickname || user.uid}
          </div>
        </div>
      </Tooltip>
    </Link>
  );

  return (
    <Card
      className={`chat-message ${grouped ? 'grouped' : ''} ${mentioned && user && (body.indexOf(`@${user.nickname} `) > -1) ? 'mentioned' : ''}`}
      title={title}
      key={time}
      extra={(
        <Tooltip title={getDate(time)}>
          <div className="chat-time">{getTime(time)}</div>
        </Tooltip>
      )}
    >
      <MessageBody message={props.message}/>
    </Card>
  );
};

export default Message;