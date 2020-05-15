import React from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import { IMessage, ISettings } from '../../reducers';
import Avatar from '../Avatar';

interface IMessageProps {
  message: IMessage,
  user: ISettings,
}

// Make double digit (dd)
const dd = (str: number) => `${str}`.length === 1
  ? `0${str}`
  : str;

const Message = (props: IMessageProps) => {
  const {
    message: {
      author,
      time,
      body,
    },
    user
  } = props;

  const date = new Date(time);
  const messageTime = [date.getHours(), date.getMinutes(), date.getSeconds()].map(dd).join(':');
  const messageDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(dd).join('.');

  const title = user && (
    <Link to={`./user/${user.uid}`}>
      <div className="chat-message__title">
        <Avatar
          avatar={user.avatar}
          nickname={user.nickname}
        />
        <div className="chat-message__nickname">
          {user.nickname}
        </div>
      </div>
    </Link>
  );

  return (
    <Card
      className="chat-message"
      title={title}
      key={time}
      extra={(
        <Tooltip title={messageDate}>
          <div className="chat-time">{messageTime}</div>
        </Tooltip>
      )}
    >
      {body}
    </Card>
  );
};

export default Message;
