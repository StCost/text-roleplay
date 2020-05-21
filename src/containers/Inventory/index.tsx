import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Input,
  Dropdown,
  Button,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { IItemsProps, Items } from '../Items';
import { IInventory, IItem, IState } from '../../reducers/interfaces';
import ItemCreator from '../Items/ItemCreator';
import actions from "../../actions";
import ItemsList, { IControl } from "../Items/ItemsList";

interface IInventoryProps extends IItemsProps {
  inventory: IInventory;
}

const noop = () => {
};

class Inventory extends Items<IInventoryProps> {
  componentDidMount = noop;
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
        .forEach(({ id, time }) => {
          const item = items.find((item: IItem) => item.id === id);
          if (item) {
            loadedItems.push({
              ...item,
              id,
              time,
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
        user: true,
      }),
    },
    {
      label: 'Выбросить',
      onClick: (item: IItem) => actions.passItem({
        id: item.id,
        uid: this.props.uid,
      }),
    },
    {
      label: 'Передать',
      onClick: (item: IItem) => {
      },
    },
    {
      label: 'Удалить',
      onClick: (item: IItem) => this.deleteModal(item),
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
        controls={this.cardControls}
      />
    )
  };
}

const mapStateToProps = (state: IState) => {
  const { loading, users, uid, currentUser, items } = state;

  const user = users[uid];
  const inventory = user ? user.inventory : {};

  return {
    loading,
    uid,
    items,
    inventory,
    currentUser,
  };
};

export default connect(mapStateToProps)(Inventory);
