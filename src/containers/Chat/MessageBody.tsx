import React from 'react';
import { Button, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { isURL } from '../../helpers/utils';
import { IMessage } from '../../reducers/interfaces';
import { importRolls } from '../../helpers/dice';
import Image from '../../components/Image';
import ItemById from '../../components/ItemById';
import actions from '../../reducers/actions';

interface IMessageBodyProps {
  message: IMessage;
  uid?: string;
}

const MessageBody = (props: IMessageBodyProps) => {
    const { uid, message } = props;
    const {
      body,
      isRP,
      rolls,
      data,
    } = message;

    if (data) {
      const { itemId, item, taken } = data;

      if (itemId) {
        return (
          <>
            <i className="rp-message">
              {body}
            </i>
            <div className={taken ? '' : 'rp-message'}>
              <ItemById
                id={itemId.trim()}
                disabled={taken}
                footer={(item && uid) ? (
                  <Popconfirm
                    title="Подобрать предмет?"
                    onConfirm={() => actions.takeItem({ uid, message })}
                    okText="Подобрать"
                    cancelText="Отмена"
                    disabled={taken}
                  >
                    <Button className="take-button" disabled={taken}>
                      <UploadOutlined/>
                    </Button>
                  </Popconfirm>
                ) : undefined}
              />
            </div>
          </>
        )
      }
    }

    if (isURL(body)) {
      if (/\.(gif|jpe?g|tiff|png|webp|bmp)/ig.test(body)) {
        return (
          <Image src={body}/>
        )
      }

      const link = (
        <a
          href={body}
          target="_blank"
          rel="noopener noreferrer"
        >
          {body}
        </a>
      );

      // https://youtu.be/afeWQn4DFKQ
      if (body.indexOf('youtu') > -1) {
        const getVideoId = (body: string) => {
          if (body.indexOf('youtu.be') > -1) {
            const regExMatch = body.match(/youtu\.be\/.* /i);
            if (regExMatch) {
              const lastMatch = regExMatch.pop();
              if (lastMatch) {
                return lastMatch.split('/').pop() || '';
              }
            }
          } else {
            return new URL(body).searchParams.get('v') || '';
          }
          return ''
        };

        const searchParams = new URL(body).searchParams;
        let params = 'listType=playlist';
        const videoId = getVideoId(body);

        if (videoId) {
          const listId = searchParams.get('list');
          if (listId)
            params += '&list=' + listId;

          const time = searchParams.get('t');
          if (time)
            params += '&start=' + time;

          return (
            <>
              {link}
              <iframe
                title={videoId}
                id="ytplayer"
                width="100%"
                height="360"
                src={`http://www.youtube.com/embed/${videoId}?${params}`}
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          )
        }
      }

      return link;
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
  }
;

export default MessageBody;
