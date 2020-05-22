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
import ItemCreator from '../Items/ItemCreator';
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

  getCreators = () => {
    const { editingItem } = this.state;
    const { currentUser } = this.props;
    const isAdmin = !!(currentUser && currentUser.isAdmin);

    return (
      <ItemCreator
        visible={!!editingItem}
        onClose={() => this.toggleEditingItem(null)}
        onSubmit={this.onCreateItem}
        item={editingItem || undefined}
        isAdmin={isAdmin}
      />
    )
  };

  getControls = () => {
    return (
      <div className="items-controls">
        <Input
          placeholder="Поиск предмета"
          onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ searchString: e.currentTarget.value })}
          allowClear
        />
        <Dropdown
          overlay={this.getFilters()}
          trigger={['click']}
        >
          <Button>
            <FilterOutlined/>
          </Button>
        </Dropdown>
      </div>
    )
  };

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
    },
    {
      label: 'Выбросить',
      onClick: (item: IItem) => actions.passItem({
        id: item.id,
        uid: this.props.uid,
        item,
      }),
    },
    {
      label: 'Передать',
      onClick: (item: IItem) => {
      },
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
