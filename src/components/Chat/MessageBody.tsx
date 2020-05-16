import React from 'react';
import { isURL } from '../../helpers/utils';
import { IMessage } from '../../reducers';
import { importRolls } from '../../helpers/dice';

interface IMessageBodyProps {
  message: IMessage;
}

const MessageBody = (props: IMessageBodyProps) => {
  const {
    body,
    isRP,
    rolls,
  } = props.message;

  if (isURL(body)) {
    console.log(body);
    if (/\.(gif|jpe?g|tiff|png|webp|bmp)/ig.test(body)) {
      return (
        <img
          src={body}
          alt=""
        />
      )
    }

    if (/youtu/.test(body)) {
      const videoId = new URL(body).searchParams.get('v') || '';

      return (
        <iframe
          title={videoId}
          id="ytplayer"
          width="100%"
          height="360"
          src={`http://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        />
      )
    }

    return (
      <a
        href={body}
        target="_blank"
        rel="noopener noreferrer"
      >
        {body}
      </a>
    )
  }

  const _body = rolls
    ? importRolls(body, rolls)
    : body;

  if (isRP) {
    return (
      <i className="rp-message">
        {_body}
      </i>
    )
  }

  return <span>{_body}</span>;
};

export default MessageBody;
