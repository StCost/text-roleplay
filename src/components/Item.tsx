import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import '../styles/item.scss';
import { IItem } from '../reducers/interfaces';
import Avatar from './Avatar';
import actions from '../reducers/actions';

interface IItemProps {
  item: IItem,
  footer?: JSX.Element,
  disabled?: boolean;
  uid?: string;
  amount?: number;
}

class Item extends Component<IItemProps> {
  getStats = () => {
    const { type, armor, capacity } = this.props.item;

    switch (type) {
      case 'wearable':
        return armor;

      case 'weapon':
        return capacity;

      default:
        const amount = this.props.amount || this.props.item.amount;
        return (amount && amount >= 2) ? `${amount}шт` : false;
    }
  };

  labels = {
    wearable: 'Защита',
    weapon: 'Магазин',
  };

  getHeaderButton = () => {
    const { footer, uid } = this.props;
    const { failed, id } = this.props.item;

    if (failed) {
      return (
        <div className="item-header-button">
          <Button
            disabled={!uid}
            onClick={() => actions.removeItem({ uid, id, all: true })}
          >
            <DeleteOutlined/>
          </Button>
        </div>
      )
    }

    if (footer)
      return (
        <div className="item-header-button">
          {footer}
        </div>
      );

    return false;
  };

  render = () => {
    const { disabled, item } = this.props;
    const {
      name = item.id,
      price = 0,
      description,
      image,
      effect,
      weight = 0,
      type,
      approved,
    } = item;

    const stats = this.getStats();
    return (
      <Card className={`item ${(approved && !disabled) ? '' : 'disabled'}`}>
        <div className="item-info">
          <div className="item-name">
            {name}
            {this.getHeaderButton()}
          </div>
          <div className="item-subinfo">
            <div className="item-price">
              {price > 0 && `Цена: ${price}`}
            </div>
            <div className="item-weight">
              {weight > 0 && `Вес: ${weight}lb`}
            </div>
          </div>
        </div>
        {(image || description) && (
          <div className="item-body">
            {image && <div className="item-image">
              <Avatar avatar={image} nickname={name} shape="square"/>
            </div>}
            {description}
          </div>
        )}

        {(stats || effect) && (
          <div className="item-prefooter">
            <div className="item-ammo">
              {stats ? `${this.labels[type] || 'Кол-во'}: ${stats}` : ''}
            </div>
            <div className="item-effect">{effect}</div>
          </div>
        )}
      </Card>
    )
  }
}

export default Item;
