import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Input,
  Dropdown,
  Button,
  Tooltip,
  InputNumber,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { IItemsProps, Items } from '../Items';
import { IInventory, IItem, IState } from '../../reducers/interfaces';
import ItemCreator from '../Items/ItemCreator';
import actions from "../../actions";
import ItemsList from "../Items/ItemsList";

interface IInventoryProps extends IItemsProps {
  inventory: IInventory;
}

class Inventory extends Items<IInventoryProps> {
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
        <Tooltip title="Кол-во загружаемых предметов за раз">
          <InputNumber
            value={this.state.itemsToLoad}
            min={1}
            max={99}
            onChange={(itemsToLoad?: number) => this.setState({ itemsToLoad: itemsToLoad || 1 })}
          />
        </Tooltip>
      </div>
    )
  };

  componentDidMount = () => {
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

  getItemsList = (items: IItem[]) => {
    const { currentUser, uid } = this.props;

    return (
      <ItemsList
        uid={uid}
        currentUser={currentUser}
        toggleEditingItem={this.toggleEditingItem}
        items={this.getInventoryItems(items)}
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
