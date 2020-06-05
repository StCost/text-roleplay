import React from 'react';
import { Card } from 'antd';
import moment from 'moment';

import { IMessage, IUser } from '../../reducers/interfaces';
import MessageBody from './MessageBody';
import UserInfo from '../../components/UserInfo';

interface IMessageProps {
  message: IMessage,
  user: IUser,
  uid: string;
  extra?: JSX.Element;
  onUserClick?: () => void;
}

const noop = () => {
};

const Message = (props: IMessageProps) => {
  const {
    message: {
      time,
      grouped,
      body,
      mentioned,
    },
    user,
    uid,
    extra,
    onUserClick = noop,
  } = props;

  if (!user || !user.uid)
    return <React.Fragment/>;

  const title = user && (
    <UserInfo
      user={user}
      onClick={onUserClick}
    />
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
      {
        extra
        ||
        <div className="chat-time">
          {moment(time).fromNow()}
        </div>
      }
      <MessageBody message={props.message} uid={uid}/>
    </Card>
  );
};

export default Message;
