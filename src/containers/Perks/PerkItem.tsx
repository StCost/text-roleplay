import React from 'react';
import {
  Button,
  Popconfirm,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import '../../styles/perks.scss';
import { IPerk } from '../../reducers/interfaces';

interface IPerkProps {
  perk: IPerk;
  onDelete?: (perk: IPerk) => void;
  hasRight?: boolean;
}

const PerkItem = (props: IPerkProps) => {
  const { perk, onDelete, hasRight } = props;
  return (
    <div className="perks-item">
      {onDelete && hasRight && (
        <Popconfirm
          title="Вы уверены, что хотите удалить перк?"
          okText="Удалить"
          cancelText="Отмена"
          onConfirm={() => onDelete(perk)}
        >
          <Button className="perks-item-close">
            <CloseOutlined/>
          </Button>
        </Popconfirm>
      )}
      <div className="perks-item-label">{perk.label}</div>
      <div className="perks-item-description">{perk.description}</div>
    </div>
  );
}

export default PerkItem;
