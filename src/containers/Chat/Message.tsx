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
} from '../../helpers/utils';

interface IMessageProps {
  message: IMessage,
  user: IUser,
  uid: string;
  onDateClick?: () => void;
}

const Message = (props: IMessageProps) => {
  const {
    message: {
      time,
      grouped,
      body,
      mentioned,
      author,
    },
    user,
    uid,
    onDateClick = () => {},
  } = props;

  const getUserStatus = (user: IUser) => {
    const { status, lastOnline } = user;

    switch(status) {
      case 'online':
        if (lastOnline + 180000 > new Date().getTime())
          return 'online';
        // Fallthrough is intended. If lastOnline is too far - user is not actually online
      case 'afk':
        return 'afk';

      default:
        return 'offline';
    }
  };

  const title = user && (
    <Link to={`./${author}/settings`}>
      <Tooltip
        title={user.lastOnline ? `Последняя активность: ${getFullTime(user.lastOnline)}` : undefined}
        placement="left"
      >
        <div className={`chat-message__title ${getUserStatus(user)}`}>
          <Avatar
            avatar={user.avatar}
            nickname={user.nickname || user.uid || author}
          />
          <div className="chat-message__nickname">
            {user.nickname || user.uid || author}
          </div>
        </div>
      </Tooltip>
    </Link>
  );

  const className = [
    'chat-message',
    grouped && 'grouped',
    mentioned && user && (body.indexOf(`@${user.nickname} `) > -1) && 'mentioned',
  ].filter(Boolean).join(' ');

  return (
    <Card
      className={className}
      title={grouped ? undefined : title}
      key={time}
    >
      <Tooltip
        title={<div onClick={onDateClick}>{getDate(time)}</div>}
        placement="left"
      >
        <div className="chat-time">{getTime(time)}</div>
      </Tooltip>
      <MessageBody message={props.message} uid={uid}/>
    </Card>
  );
};

export default Message;
