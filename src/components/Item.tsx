import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import '../styles/item.scss';
import { IItem } from '../reducers/interfaces';
import Avatar from './Avatar';
import actions from '../actions';

interface IItemProps {
  item: IItem,
  showTechInfo?: boolean,
  footer?: JSX.Element,
  disabled?: boolean;
  uid?: string;
}

class Item extends Component<IItemProps> {
  getStats = () => {
    const { type, armor, amount, capacity } = this.props.item;

    switch (type) {
      case 'wearable':
        return armor;

      case 'weapon':
        return capacity;

      default:
        return (amount && amount >= 2) ? `${amount}шт` : false;
    }
  };

  labels = {
    wearable: 'Защита',
    weapon: 'Магазин',
  };

  getFooter = () => {
    const { footer, uid } = this.props;
    const { failed, id } = this.props.item;

    if (failed) {
      return (
        <div className="item-footer">
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
        <div className="item-footer">
          {footer}
        </div>
      )
  };

  render = () => {
    const {
      name = this.props.item.id,
      price = 0,
      description,
      image,
      effect,
      weight = 0,
      type,
      approved,
    } = this.props.item;
    const { disabled } = this.props;

    const stats = this.getStats();
    return (
      <Card className={`item ${(approved && !disabled) ? '' : 'disabled'}`}>
        <div className="item-info">
          <div className="item-name">{name}</div>
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
              {
                // @ts-ignore
                stats ? `${this.labels[type] || 'Кол-во'}: ${stats}` : ''
              }
            </div>
            <div className="item-effect">{effect}</div>
          </div>
        )}
        {this.getFooter()}
      </Card>
    )
  }
}

export default Item;
