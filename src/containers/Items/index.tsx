import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Input,
  Radio,
  Dropdown,
  InputNumber,
  Tooltip, Checkbox,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { RouteComponentProps } from 'react-router';
import { FilterOutlined } from '@ant-design/icons';

import '../../styles/items.scss';
import actions from '../../actions';
import { IItem, IState, ItemType, IUser } from '../../reducers/interfaces';
import Loader from '../../components/Loader';
import ItemCreator from './ItemCreator';
import ItemsList from './ItemsList';

interface IItemsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  uid: string;
  items: IItem[];
  currentUser: IUser | null;
}

interface IItemsState {
  creatingItem: boolean;
  editingItem: IItem | null;
  searchString: string;
  filters: { [key: string]: boolean };
  itemsToLoad: number;
  showApproved: boolean;
  showNotApproved: boolean;
}

export class Items extends React.Component<IItemsProps, IItemsState> {
  state = {
    creatingItem: false,
    editingItem: null,
    searchString: '',
    itemsToLoad: 99,
    showApproved: true,
    showNotApproved: false,
    filters: {
      'weapon': true,
      'consumable': true,
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
      <Button
        className="items-approved-button"
        name={name}
        // @ts-ignore
        onClick={() => this.setState({ filters: { ...filters, [name]: !filters[name] } })}
      >
        <Checkbox
          checked={
            // @ts-ignore
            filters[name]
          }>
          {label}
        </Checkbox>
      </Button>
    );

    return (
      <Radio.Group
        onChange={this.onFilterChange}
        defaultValue={undefined}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Radio.Button>Всё</Radio.Button>
        {getButton('weapon', 'Оружие')}
        {getButton('consumable', 'Употребляемое')}
        {getButton('wearable', 'Одежда/Броня')}
        {getButton('ammo', 'Патроны')}
        {getButton('junk', 'Мусор')}
        {getButton('note', 'Записки')}
        {getButton('key', 'Ключи')}
        {getButton('misc', 'Прочее')}
        <Button className="items-approved-button" onClick={() => this.setState({ showApproved: !showApproved })}>
          <Checkbox checked={showApproved}>Подтвержденные</Checkbox>
        </Button>
        <Button className="items-approved-button" onClick={() => this.setState({ showNotApproved: !showNotApproved })}>
          <Checkbox checked={showNotApproved}>Не Подтвержденные</Checkbox>
        </Button>
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

  render = () => {
    const { loading, currentUser, uid } = this.props;
    const { itemsToLoad } = this.state;
    const items = this.items;

    return (
      <Card className="items">
        <Loader loading={loading}/>
        {this.getCreators()}
        {this.getControls()}
        <ItemsList
          items={items}
          uid={uid}
          currentUser={currentUser}
          toggleEditingItem={this.toggleEditingItem}
        />
        <Button
          className="items-load-button"
          onClick={() => actions.getMoreItems({ amount: itemsToLoad, lastItem: items[items.length - 1] })}
        >
          Загрузить {itemsToLoad}шт
        </Button>
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
