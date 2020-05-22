import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Dropdown,
  InputNumber,
  Tooltip,
  Modal,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import '../../styles/items.scss';
import actions from '../../reducers/actions';
import { IDeletedItemData, IItem, IState, IUser } from '../../reducers/interfaces';
import ItemCreator from './ItemCreator';
import ItemsList, { IControl } from '../ItemsTable/ItemsList';
import ItemsTable, { IItemsTableProps, IItemsTableState } from "../ItemsTable";
import amountModal from "../../components/AmountModal";

export interface IItemsProps extends IItemsTableProps {
  user: IUser | null;
  uid: string;
  currentUser: IUser | null;
  deletingItemData: IDeletedItemData;
}

interface IItemsState extends IItemsTableState {
  creatingItem: boolean;
  editingItem: IItem | null;
  itemsToLoad: number;
}

export class Items extends ItemsTable<IItemsProps, IItemsState> {
  state = {
    ...this.defaultState,
    creatingItem: false,
    editingItem: null,
    itemsToLoad: 99,
  };

  componentDidMount = () => {
    actions.getItems({});
  };

  getPageControls = () => [
    <Button
      key="creator"
      onClick={() => this.toggleCreatingItem(true)}
    >
      Создать предмет
    </Button>,
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
    <Tooltip
      key="load-amount"
      title="Кол-во загружаемых предметов за раз"
    >
      <InputNumber
        value={this.state.itemsToLoad}
        min={1}
        max={99}
        onChange={(itemsToLoad?: number) => this.setState({ itemsToLoad: itemsToLoad || 1 })}
      />
    </Tooltip>
  ];

  cardControls: IControl[] = [
    {
      label: 'Взять',
      onClick: (item: IItem) => amountModal({
        item: item,
        max: 100,
        onSubmit: (amount: number) =>
          actions.giveItem({
            id: item.id,
            uid: this.props.uid,
            itemType: item.type,
            amount,
          })
      }),
      condition: (item: IItem) => item.approved && Boolean(this.props.currentUser && this.props.currentUser.isAdmin)
    },
    {
      label: 'Редактировать',
      onClick: (item: IItem) => this.toggleEditingItem(item),
      condition: (item: IItem) => Boolean((this.props.uid === item.author && !item.approved) || (this.props.currentUser && this.props.currentUser.isAdmin))
    },
    {
      label: 'В консоль',
      onClick: console.log,
      condition: () => Boolean(this.props.currentUser && this.props.currentUser.isAdmin)
    },
    {
      label: 'Удалить',
      onClick: (item: IItem) => this.deleteModal(item),
      condition: (item: IItem) => Boolean((this.props.uid === item.author && !item.approved) || (this.props.currentUser && this.props.currentUser.isAdmin))
    },
  ];

  toggleCreatingItem = (creatingItem: boolean = !this.state.creatingItem) =>
    this.setState({ creatingItem });

  toggleEditingItem = (item?: IItem | null) =>
    this.setState({ editingItem: item || null });

  onCreateItem = (item: IItem) => {
    actions.setItem({ item });
    this.toggleCreatingItem(false);
    this.toggleEditingItem(null);
  };

  getCreators = () => {
    const { creatingItem, editingItem } = this.state;
    const { currentUser } = this.props;
    const isAdmin = !!(currentUser && currentUser.isAdmin);

    return (
      <>
        <ItemCreator
          visible={creatingItem}
          onClose={() => this.toggleCreatingItem(false)}
          onSubmit={this.onCreateItem}
          isAdmin={isAdmin}
        />
        <ItemCreator
          visible={!!editingItem}
          onClose={() => this.toggleEditingItem(null)}
          onSubmit={this.onCreateItem}
          item={editingItem || undefined}
          isAdmin={isAdmin}
        />
      </>
    )
  };

  deleteModal: (item: IItem) => void = (item: IItem) => Modal.confirm({
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

  getContent = (items: IItem[]) => {
    const { currentUser } = this.props;
    return (
      <ItemsList
        items={items}
        currentUser={currentUser}
        controls={this.cardControls}
      />
    )
  };

  getDeletingModal = () => {
    const { deletingItemData, loading } = this.props;
    const { itemId, usersChecked, messagesCleared, messagesChecked, deleted, usersCleared, done } = deletingItemData;
    return itemId && (
      <div className="item-deleting-modal">
        <div>ID предмета: {itemId}</div>
        <div>Удалён из списка предметов: {deleted ? 'готово' : 'в процессе'}</div>
        <div>Проверено сообщений: {messagesChecked}</div>
        <div>Очищено сообщений: {messagesCleared}</div>
        <div>Проверено пользователей: {usersChecked}</div>
        <div>Очищено пользователей: {usersCleared}</div>
        <Button
          onClick={() => actions.deleteItemProgress({ field: 'itemId', value: '' })}
          disabled={!done || loading}
        >
          Готово
        </Button>
        <button
          className="secret"
          onClick={() => actions.deleteItemProgress({ field: 'itemId', value: '' })}
          disabled={loading}
        />
      </div>
    )
  };

  getFooter = (items: IItem[]): JSX.Element => {
    const { itemsToLoad } = this.state;
    const { loading } = this.props;
    return (
      <>
        {this.getCreators()}
        {this.getDeletingModal()}
        {!loading && (
          <Button
            className="items-load-button"
            onClick={() => actions.getMoreItems({ amount: itemsToLoad, lastItem: items[items.length - 1] })}
          >
            Загрузить {itemsToLoad}шт
          </Button>
        )}
      </>
    )
  };
}

const mapStateToProps = (state: IState) => {
  const { loading, currentUser, uid, items, deletingItemData } = state;

  return {
    loading,
    currentUser,
    uid,
    items,
    deletingItemData,
  };
};

export default connect(mapStateToProps)(Items);
