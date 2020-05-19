import React, { Component } from 'react';
import { Card } from 'antd';

import '../styles/item.scss';
import { IItem } from '../reducers/interfaces';
import Avatar from "./Avatar";

class Item extends Component<{ item: IItem, showTechInfo?: boolean }> {
  render = () => {
    const {
      name = this.props.item.id,
      price = 0,
      description,
      image,
      effect,
      isWeapon,
      hasAmmo,
      capacity,
      weight = 0,
    } = this.props.item;

    return (
      <Card className="item">
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
              <Avatar avatar={image} nickname={name}/>
            </div>}
            {description}
          </div>
        )}

        {((isWeapon && hasAmmo && capacity) || effect) && (
          <div className="item-footer">
            <div className="item-ammo">
              {(isWeapon && hasAmmo && capacity) ? `Магазин: ${capacity}` : ''}
            </div>
            <div className="item-effect">{effect}</div>
          </div>
        )}
      </Card>
    )
  }
}

export default Item;
