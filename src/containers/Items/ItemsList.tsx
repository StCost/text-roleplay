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

interface IItemsListProps {
  items: IItem[];
  uid: string;
  currentUser: IUser | null;
  toggleEditingItem: (item: IItem) => void;
}

class ItemsList extends Component<IItemsListProps> {
  getControls = (item: IItem) => (
    <Menu>
      <Menu.Item>
        <Button>
          Взять
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={() => this.props.toggleEditingItem(item)}>
          Редактировать
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={this.deleteModal(item)}>
          Удалить
        </Button>
      </Menu.Item>
    </Menu>
  );

  getFooter = (item: IItem) => (
    <Dropdown
      overlay={this.getControls(item)}
      trigger={['click']}
    >
      <Button>
        <InsertRowBelowOutlined/>
      </Button>
    </Dropdown>
  );

  deleteModal = (item: IItem) => () => Modal.confirm({
    title: 'Вы уверены, что хотите удалить предмет? Это действие необратимо',
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
            footer={this.canControl(item) ? this.getFooter(item) : undefined}
          />
        ))}
      </div>
    )
  }
}

export default ItemsList;
