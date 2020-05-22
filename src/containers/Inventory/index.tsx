import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Input,
  Dropdown,
  Button,
  Modal,
  message as notify,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { IItemsProps, Items } from '../Items';
import { IInventory, IItem, IState } from '../../reducers/interfaces';
import actions from '../../actions';
import ItemsList, { IControl } from '../Items/ItemsList';

interface IInventoryProps extends IItemsProps {
  inventory: IInventory;
}

const noop = () => {
};

class Inventory extends Items<IInventoryProps> {
  componentDidMount = () => {
    const { user, uid } = this.props;
    if (!user && uid) {
      actions.getUser({ uid });
    }
  };
  getFooter = noop;
  deleteModal = noop;
  onCreateItem = noop;
  toggleCreatingItem = noop;

  pageControls = [
    <Input
      key="search"
      placeholder="Поиск предмета"
      onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ searchString: e.currentTarget.value })}
      allowClear
    />,
    <Dropdown
      key="filters"
      overlay={this.getFilters()}
      trigger={['click']}
    >
      <Button>
        <FilterOutlined/>
      </Button>
    </Dropdown>
  ];

  getInventoryItems = (items: IItem[]) => {
    const { inventory, loading } = this.props;

    if (inventory && !loading) {
      const inventoryItems = Object.values(inventory);
      const loadedItems: IItem[] = [];
      const notLoadedItems: string[] = [];

      inventoryItems
        .forEach((inventoryItem) => {
          const { id } = inventoryItem;
          const item = items.find((item: IItem) => item.id === id);
          if (item) {
            loadedItems.push({
              ...item,
              ...inventoryItem,
            });
          } else {
            notLoadedItems.push(id);
          }
        });

      if (notLoadedItems.length > 0) {
        actions.getItemById({ id: notLoadedItems.shift() });
      }

      return loadedItems;
    }

    return [];
  };

  getItemsList = (items: IItem[]) => {
    const { currentUser, uid } = this.props;

    return (
      <ItemsList
        uid={uid}
        currentUser={currentUser}
        toggleEditingItem={this.toggleEditingItem}
        items={this.getInventoryItems(items)}
        controls={(currentUser && (currentUser.uid === uid || currentUser.isAdmin))
          ? this.cardControls
          : undefined
        }
      />
    )
  };

  cardControls: IControl[] = [
    {
      label: 'Показать',
      onClick: (item: IItem) => actions.passItem({
        id: item.id,
        uid: this.props.uid,
        demonstrate: true,
      }),
    },
    {
      label: 'Использовать',
      onClick: (item: IItem) => actions.passItem({
        id: item.id,
        uid: this.props.uid,
        use: true,
      }),
      condition: (item: IItem) => item.type === 'usable',
    },
    {
      label: 'Выбросить',
      onClick: (item: IItem) => actions.passItem({
        id: item.id,
        uid: this.props.uid,
        item: {
          ...item,
          amount: 1,
        },
      }),
    },
    {
      label: 'Передать',
      onClick: (item: IItem) => {
      },
    },
    {
      label: 'В консоль',
      onClick: console.log,
      condition: () => Boolean(this.props.currentUser && this.props.currentUser.isAdmin)
    },
    {
      label: 'Удалить',
      onClick: (item: IItem) => Modal.confirm({
        title: 'Удалить',
        maskClosable: true,
        okText: 'Удалить все',
        cancelText: 'Отмена',
        autoFocusButton: 'cancel',
        content: (
          <div>
            <span>Это действие невозможно отменить. Вы уверены?</span>
            <br/> <br/> <br/>
            <Button
              style={{ width: '-webkit-fill-available' }}
              onClick={() => {
                actions.removeItem({ id: item.id, uid: this.props.uid });
                notify.success('Удалено');
              }}
            >Удалить один</Button>
          </div>
        ),
        onOk: (close) => {
          actions.removeItem({ id: item.id, uid: this.props.uid, all: true });
          close();
        },
      }),
      condition: () => Boolean(this.props.currentUser && this.props.currentUser.isAdmin)
    },
  ];
}

const mapStateToProps = (state: IState, props: IInventoryProps) => {
  const { loading, users, currentUser, items } = state;

  const uid = new URLSearchParams(props.match.params).get('uid') || state.uid || '0';
  const user = users[uid];
  if (user && !user.uid && uid) {
    user.uid = uid;
  }

  const inventory = user ? user.inventory : {};

  return {
    loading,
    uid,
    items,
    inventory,
    user,
    currentUser,
  };
};

export default connect(mapStateToProps)(Inventory);
