import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Input,
  Radio,
  Dropdown,
  InputNumber,
  Tooltip,
  Switch, Modal,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { RouteComponentProps } from 'react-router';
import { FilterOutlined } from '@ant-design/icons';

import '../../styles/items.scss';
import actions from '../../actions';
import { IItem, IState, ItemType, IUser } from '../../reducers/interfaces';
import Loader from '../../components/Loader';
import ItemCreator from './ItemCreator';
import ItemsList, { IControl } from './ItemsList';

export interface IItemsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  uid: string;
  items: IItem[];
  currentUser: IUser | null;
}

export interface IItemsState {
  creatingItem: boolean;
  editingItem: IItem | null;
  searchString: string;
  filters: { [key: string]: boolean };
  itemsToLoad: number;
  showApproved: boolean;
  showNotApproved: boolean;
}

export class Items<T extends IItemsProps> extends React.Component<T, IItemsState> {
  state = {
    creatingItem: false,
    editingItem: null,
    searchString: '',
    itemsToLoad: 99,
    showApproved: true,
    showNotApproved: false,
    filters: {
      'weapon': true,
      'usable': true,
      'wearable': true,
      'junk': true,
      'ammo': true,
      'note': true,
      'key': true,
      'misc': true,
    },
  };

  get items() {
    const { searchString, filters, showApproved, showNotApproved } = this.state;

    const _searchString = searchString.toLowerCase();
    return this
      .props
      .items
      .filter((item: IItem) => {
        const { name, description, effect, type, approved } = item;
        return (
          (name && name.toLowerCase().indexOf(_searchString) > -1)
          || (description && description.toLowerCase().indexOf(_searchString) > -1)
          || (effect && effect.toLowerCase().indexOf(_searchString) > -1)
        ) && (
          // @ts-ignore
          filters[type]
        ) && (
          (showApproved && approved === true)
          || (showNotApproved && approved === false)
        )
      })
  }

  componentDidMount = () => {
    actions.getItems({});
  };

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

  onFilterChange = (e: RadioChangeEvent) =>
    this.setState({ filters: this.state.filters });

  getFilters = () => {
    const { showNotApproved, showApproved, filters } = this.state;

    const getButton = (name: ItemType, label: string) => (
      <div
        tabIndex={0}
        className="items-approved-button"
        // @ts-ignore
        onClick={() => this.setState({ filters: { ...filters, [name]: !filters[name] } })}
      >
        <Switch
          checked={
            // @ts-ignore
            filters[name]
          }/>
        {label}
      </div>
    );

    return (
      <Radio.Group
        onChange={this.onFilterChange}
        defaultValue={undefined}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {getButton('weapon', 'Оружие')}
        {getButton('usable', 'Используемое')}
        {getButton('wearable', 'Одежда/Броня')}
        {getButton('ammo', 'Патроны')}
        {getButton('junk', 'Мусор')}
        {getButton('note', 'Записки')}
        {getButton('key', 'Ключи')}
        {getButton('misc', 'Прочее')}
        <div tabIndex={0} className="items-approved-button"
             onClick={() => this.setState({ showApproved: !showApproved })}>
          <Switch checked={showApproved}/>Подтвержденные
        </div>
        <div tabIndex={0} className="items-approved-button"
             onClick={() => this.setState({ showNotApproved: !showNotApproved })}>
          <Switch checked={showNotApproved}/>Не Подтвержденные
        </div>
      </Radio.Group>
    )
  };

  getControls = () => {
    return (
      <div className="items-controls">
        <Button onClick={() => this.toggleCreatingItem(true)}>
          Создать предмет
        </Button>
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

  cardControls: IControl[] = [
    {
      label: 'Взять',
      onClick: (item: IItem) => actions.giveItem({ id: item.id, uid: this.props.uid, itemType: item.type }),
      condition: (item: IItem) => item.approved && Boolean(this.props.currentUser && this.props.currentUser.isAdmin)
    },
    {
      label: 'Редактировать',
      onClick: (item: IItem) => this.toggleEditingItem(item),
      condition: (item: IItem) => Boolean((this.props.uid === item.author && !item.approved) || (this.props.currentUser && this.props.currentUser.isAdmin))
    },
    {
      label: 'Удалить',
      onClick: (item: IItem) => this.deleteModal(item),
      condition: (item: IItem) => Boolean((this.props.uid === item.author && !item.approved) || (this.props.currentUser && this.props.currentUser.isAdmin))
    },
  ];

  getItemsList = (items: IItem[]) => {
    const { currentUser, uid } = this.props;
    return (
      <ItemsList
        items={items}
        uid={uid}
        currentUser={currentUser}
        toggleEditingItem={this.toggleEditingItem}
        controls={this.cardControls}
      />
    )
  };

  getFooter = (items: IItem[]): JSX.Element | void => {
    const { itemsToLoad } = this.state;
    const { loading } = this.props;
    return loading
      ? (
        <React.Fragment/>
      ) : (
        <Button
          className="items-load-button"
          onClick={() => actions.getMoreItems({ amount: itemsToLoad, lastItem: items[items.length - 1] })}
        >
          Загрузить {itemsToLoad}шт
        </Button>
      )
  };

  render = () => {
    const { loading } = this.props;
    const items = this.items;

    return (
      <Card className="items">
        <Loader loading={loading}/>
        {this.getCreators()}
        {this.getControls()}
        {this.getItemsList(items)}
        {this.getFooter(items)}
      </Card>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { loading, currentUser, uid, items } = state;

  return {
    loading,
    currentUser,
    uid,
    items,
  };
};

export default connect(mapStateToProps)(Items);
