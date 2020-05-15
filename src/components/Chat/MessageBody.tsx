import React from 'react';
import { isURL } from "../../helpers/utils";

interface IMessageBodyProps {
  message: string;
}

const MessageBody = (props: IMessageBodyProps) => {
  const { message } = props;

  if (isURL(message)) {
    if (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i.test(message)) {
      return (
        <img
          src={message}
          alt=""
        />
      )
    }

    if (/youtu/.test(message)) {
      const videoId = new URL(message).searchParams.get('v') || '';

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
        href={message}
        target="_blank"
        rel="noopener noreferrer"
      >
        {message}
      </a>
    )
  }

  return <span>{message}</span>;
};

export default MessageBody;
