import React from 'react';
import {
  Button,
  Popconfirm,
  Collapse,
  Tooltip,
  Input,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { isURL, processLinks } from '../../helpers/utils';
import { IMessage } from '../../reducers/interfaces';
import { importRolls } from '../../helpers/dice';
import ItemById from '../../components/ItemById';
import actions from '../../reducers/actions';
import { ICharacterChanges, ICharacteristic } from '../Character/config';
import PerkItem from "../Perks/PerkItem";

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
      const {
        itemId,
        taken,
        amount,
        type,
        characterChanges,
        perk
      } = data;

      if (perk) {
        return (
          <>
            <i className="rp-message">
              {body}
              <PerkItem perk={perk}/>
            </i>
          </>
        )
      }

      if (characterChanges) {
        const changes: ICharacterChanges[] = Object.values(characterChanges);

        const formatChange = (change: number | string | ICharacteristic) => {
          switch (typeof change) {
            case 'string':
            case 'number':
              return change;

            default:
              return [
                change.base && `b:${change.base}`,
                change.change && `${change.base ? ' + ' : ''}c:${change.change}`,
                change.total && ` = t:${change.total}`,
              ].filter(Boolean).join('');
          }
        };

        return (
          <Collapse>
            <Collapse.Panel
              key="char-changes"
              header={body}
            >
              {changes.map(({ label, full, before, after }) => (
                <div
                  key={label}
                  className="chat-char-changes"
                >
                  <Tooltip title={full}>
                    <span>{label}</span>
                  </Tooltip>
                  <div>
                    <Input
                      value={formatChange(before)}
                      readOnly
                    />
                    ->
                    <Input
                      value={formatChange(after)}
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </Collapse.Panel>
          </Collapse>
        )
      }

      if (itemId) {
        return (
          <>
            <i className="rp-message">
              {body}
            </i>
            <div className={taken ? '' : 'rp-message'}>
              <ItemById
                id={itemId.trim()}
                amount={amount}
                disabled={taken}
                footer={uid && type ? (
                  <Popconfirm
                    title="Подобрать предмет?"
                    onConfirm={() => actions.takeItem({ uid, message, data })}
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
      const bodyWithLinks = processLinks(body);
      if (bodyWithLinks) {
        return <span>{bodyWithLinks}</span>;
      }
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
