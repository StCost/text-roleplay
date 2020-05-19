import React, { Component } from 'react';
import {
  Dropdown,
  Menu,
  Button,
  Modal,
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
  render = () => {
    const { uid, currentUser, toggleEditingItem } = this.props;
    const canControl = (item: IItem) =>
      uid === item.author || (currentUser && currentUser.isAdmin);

    const deleteModal = (item: IItem) => () => Modal.confirm({
      title: 'Вы уверены, что хотите удалить предмет? Это действие необратимо',
      maskClosable: true,
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: (close) => {
        actions.deleteItem({ id: item.id });
        close();
      }
    });

    const controls = (item: IItem) => (
      <Menu>
        <Menu.Item>
          <Button>
            Взять
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => toggleEditingItem(item)}>
            Редактировать
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={deleteModal(item)}>
            Удалить
          </Button>
        </Menu.Item>
      </Menu>
    );

    const getFooter = (item: IItem) => (
      <Dropdown
        overlay={controls(item)}
        trigger={['click']}
      >
        <Button>
          <InsertRowBelowOutlined/>
        </Button>
      </Dropdown>
    );

    return (
      <div className="items-body">
        {this.props.items.map((item: IItem) => (
          <Item
            key={item.id + item.time}
            item={item}
            footer={canControl(item) ? getFooter(item) : undefined}
          />
        ))}
      </div>
    )
  }
}

export default ItemsList;
