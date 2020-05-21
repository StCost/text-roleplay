import React, { Component } from 'react';
import {
  Dropdown,
  Menu,
  Button,
  Modal,
  Empty,
} from 'antd';
import { InsertRowBelowOutlined } from '@ant-design/icons';

import { IItem, IUser } from '../../reducers/interfaces';
import actions from '../../actions';
import Item from '../../components/Item';

interface IControl {
  label: string,
  onClick: (item: IItem) => void;
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
  controls: IControl[] = [
    {
      label: 'Взять',
      onClick: (item: IItem) => actions.giveItem({ id: item.id, uid: this.props.uid }),
      isAdmin: true,
    },
    {
      label: 'Редактировать',
      onClick: (item: IItem) => this.props.toggleEditingItem(item),
    },
    {
      label: 'Удалить',
      onClick: (item: IItem) => this.deleteModal(item),
    },
  ];

  getControls = (item: IItem) => {
    const { currentUser } = this.props;
    const controls = this.props.controls || this.controls;
    if (this.canControl(item)) return false;

    return (
      <Menu>
        {controls.map(({ label, onClick, isAdmin }: IControl) => (
          ((!isAdmin || (currentUser && currentUser.isAdmin)) &&
            <Menu.Item key={label}>
              <Button onClick={() => onClick(item)}>
                {label}
              </Button>
            </Menu.Item>
          )))}
      </Menu>
    );
  };

  getFooter = (item: IItem) => {
    const controls = this.getControls(item);
    if (!controls) return undefined;

    return (
      <Dropdown
        overlay={controls}
        trigger={['click']}
      >
        <Button>
          <InsertRowBelowOutlined/>
        </Button>
      </Dropdown>
    )
  };

  deleteModal = (item: IItem) => Modal.confirm({
    title: 'Удалить',
    content: 'Это действие невозможно отменить. Вы уверены?',
    maskClosable: true,
    okText: 'Удалить',
    cancelText: 'Отмена',
    onOk: (close) => {
      actions.deleteItem({ id: item.id });
      close();
    }
  });

  canControl = (item: IItem) => {
    const { uid, currentUser } = this.props;
    return uid === item.author || (currentUser && currentUser.isAdmin);
  };

  render = () => {
    const { items } = this.props;

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
          />
        ))}
      </div>
    )
  }
}

export default ItemsList;
