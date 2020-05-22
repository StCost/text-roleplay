import React, { Component } from 'react';
import {
  Dropdown,
  Menu,
  Button,
  Empty,
} from 'antd';
import { InsertRowBelowOutlined } from '@ant-design/icons';

import { IItem, IUser } from '../../reducers/interfaces';
import Item from '../../components/Item';

export interface IControl {
  label: string,
  onClick: (item: IItem) => void;
  condition?: (item: IItem) => boolean;
  isAdmin?: boolean;
}

interface IItemsListProps {
  items: IItem[];
  uid: string;
  currentUser: IUser | null;
  toggleEditingItem: (item: IItem) => void;
  controls?: IControl[];
}

class ItemsList extends Component<IItemsListProps> {
  getFooter = (item: IItem) => {
    const { controls } = this.props;
    if (!controls) return;

    const controlButtons = controls
      .map(({ label, onClick, isAdmin, condition }: IControl) => {
        if (condition && !condition(item)) return;

        return (
          <Menu.Item key={label}>
            <Button onClick={() => onClick && onClick(item)}>
              {label}
            </Button>
          </Menu.Item>
        );
      }).filter(Boolean);
    if (controlButtons.length === 0) return;

    return (
      <Dropdown
        overlay={<Menu>{controlButtons}</Menu>}
        trigger={['click']}
      >
        <Button>
          <InsertRowBelowOutlined/>
        </Button>
      </Dropdown>
    )
  };

  render = () => {
    const { items, uid } = this.props;

    if (!items || items.length === 0) {
      return (
        <Empty description="Нет предметов"/>
      )
    }

    return (
      <div className="items-body">
        {items.map((item: IItem) => (
          <Item
            key={item.id + item.time}
            item={item}
            footer={this.getFooter(item)}
            uid={uid}
          />
        ))}
      </div>
    )
  }
}

export default ItemsList;
