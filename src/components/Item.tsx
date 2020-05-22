import React, { Component } from 'react';
import { Card } from 'antd';

import '../styles/item.scss';
import { IItem } from '../reducers/interfaces';
import Avatar from "./Avatar";

interface IItemProps {
  item: IItem,
  showTechInfo?: boolean,
  footer?: JSX.Element,
  disabled?: boolean;
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
        return `${amount}шт`;
    }
  };

  labels = {
    wearable: 'Защита',
    weapon: 'Магазин',
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
    const { footer, disabled } = this.props;

    const stats = this.getStats();
    return (
      <Card className={`item ${(approved && !disabled) ? '' : 'disabled'}`}>
        <div className="item-info">
          <div className="item-name">{name}</div>
          <div className="item-subinfo">
            <div className="item-price">
              Цена: {price}
            </div>
            <div className="item-weight">
              Вес: {weight}lb
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
        {footer && (
          <div className="item-footer">
          {footer}
          </div>
        )}
      </Card>
    )
  }
}

export default Item;
