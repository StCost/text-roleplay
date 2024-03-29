import React, { ChangeEvent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Input,
  Dropdown,
  Button,
  Modal,
} from 'antd';
import { FilterOutlined, DatabaseOutlined } from '@ant-design/icons';

import '../../styles/items.scss';
import { IInventory, IItem, IState, IUser } from '../../reducers/interfaces';
import actions from '../../reducers/actions';
import ItemsList, { IControl } from '../ItemsTable/ItemsList';
import ActiveUsersList from '../../components/UsersList';
import ItemsTable, { IItemsTableProps, IItemsTableState } from '../ItemsTable';
import amountModal from '../../components/AmountModal';
import { getItemName, getStateUser, redirectToUserPage } from '../../helpers/utils';
import { ICharacter } from '../Character/config';

interface IInventoryProps extends IItemsTableProps {
  inventory: IInventory;
  loading: boolean;
  user: IUser | null;
  uid: string;
  items: IItem[];
  currentUser: IUser | null;
  hasRight: boolean;
  character: ICharacter;
}

interface IInventoryState extends IItemsTableState {
  passItem: IItem | null;
}

class Inventory extends ItemsTable<IInventoryProps, IInventoryState> {
  state = {
    ...this.defaultState,
    editingItem: null,
    passItem: null,
    ...JSON.parse(localStorage.getItem('inventory-state') || '{}'),
  };

  componentDidMount = () => {
    const { character, uid, user, currentUser, history } = this.props;
    if (!character && uid) {
      actions.getCharacter({ uid });
    }
    redirectToUserPage(user, currentUser, history);
  };

  componentDidUpdate = (prevProps: IInventoryProps, prevState: IInventoryState) => {
    const { user, currentUser, history } = this.props;
    if (prevState !== this.state) {
      localStorage.setItem('inventory-state', JSON.stringify(this.state));
    }
    redirectToUserPage(user, currentUser, history);
  };

  getPageControls = () => [
    <Input
      key="search"
      placeholder="Поиск предмета"
      onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ searchString: e.currentTarget.value })}
      allowClear
    />,
    <Dropdown
      key="filters"
      overlay={this.getFilters(this.state)}
      trigger={['click']}
    >
      <Button>
        <FilterOutlined/>
      </Button>
    </Dropdown>,
    this.getPassModal(),
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

  passItem = (item?: IItem | null) =>
    this.setState({ passItem: item || null });

  getPassModal = () => {
    const { passItem } = this.state;
    return (
      <Modal
        key="pass-modal"
        visible={!!passItem}
        footer={<Button onClick={() => this.passItem(null)}>Закрыть</Button>}
        onCancel={() => this.passItem(null)}
      >
        <ActiveUsersList onClick={(user: IUser) => {
          if (passItem !== null) {
            actions.passItem({
              uid: this.props.uid,
              // @ts-ignore
              id: passItem.id,
              to: user,
              item: passItem,
            });
            this.passItem(null);
          }
        }}/>
      </Modal>
    )
  };

  cardControls: IControl[] = [
    {
      label: 'Показать',
      onClick: (item: IItem) => amountModal({
        item: item,
        onSubmit: (amount: number) => actions.passItem({
          id: item.id,
          uid: this.props.uid,
          demonstrate: true,
          item: {
            ...item,
            amount,
          }
        })
      })
    },
    {
      label: 'Использовать',
      onClick: (item: IItem) => Modal.confirm({
        title: `Использовать ${getItemName(item, false)}?`,
        onOk: (close) => {
          actions.passItem({
            id: item.id,
            uid: this.props.uid,
            item: {
              ...item,
              amount: 1,
            },
            use: true,
          });
          close();
        },
        okText: 'Да',
        cancelText: 'Отмена',
      }),
      condition: (item: IItem) => item.type === 'usable' || item.type === 'weapon',
    },
    {
      label: 'Выбросить',
      onClick: (item: IItem) => amountModal({
        item: item,
        onSubmit: (amount: number) => actions.passItem({
          id: item.id,
          uid: this.props.uid,
          item: {
            ...item,
            amount,
          },
        })
      }),
    },
    {
      label: 'Передать',
      onClick: (item: IItem) => amountModal({
        item: item,
        onSubmit: (amount: number) => this.passItem({ ...item, amount })
      })
    },
    {
      label: 'В консоль',
      onClick: console.log,
      condition: () => Boolean(this.props.currentUser && this.props.currentUser.isAdmin)
    },
    {
      label: 'Удалить',
      onClick: (item: IItem) => amountModal({
        item: item,
        onSubmit: (amount: number) =>
          actions.removeItem({ ...item, id: item.id, uid: this.props.uid, amount })
      }),
      condition: () => Boolean(this.props.currentUser && this.props.currentUser.isAdmin)
    },
  ];

  getTitle = () =>
    !!this.props.user && (
      <>
        <DatabaseOutlined/>
        {' '}
        Инвентарь игрока {this.props.user.nickname || this.props.user.uid}
      </>
    );

  getContent = (items: IItem[]) => {
    const { currentUser, uid, hasRight } = this.props;

    return (
      <ItemsList
        uid={uid}
        currentUser={currentUser}
        items={this.getInventoryItems(items)}
        controls={hasRight
          ? this.cardControls
          : undefined
        }
      />
    )
  };
}

const mapStateToProps = (state: IState, props: IInventoryProps) => {
  const { users, items, messages } = state;

  const userData = getStateUser(state, props);
  const { character } = userData;

  const inventory = character ? character.inventory : {};

  return {
    items,
    inventory,
    users,
    messages,
    ...userData,
  };
};

export default withRouter(connect(mapStateToProps)(Inventory));
