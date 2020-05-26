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
  uid: string;
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
  } = props;

  const title = user && (
    <Link to={`./${author}/settings`}>
      <Tooltip
        title={user.lastOnline ? `Последняя активность: ${getFullTime(user.lastOnline)}` : undefined}
        placement="left"
      >
        <div className={`chat-message__title ${isOnline(user.lastOnline) ? 'online' : ''}`}>
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

  return (
    <Card
      className={`chat-message ${grouped ? 'grouped' : ''} ${mentioned && user && (body.indexOf(`@${user.nickname} `) > -1) ? 'mentioned' : ''}`}
      title={grouped ? undefined : title}
      key={time}
    >
      <Tooltip
        title={getDate(time)}
        placement="left"
      >
        <div className="chat-time">{getTime(time)}</div>
      </Tooltip>
      <MessageBody message={props.message} uid={uid}/>
    </Card>
  );
};

export default Message;
