import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Input,
  Radio,
  Dropdown,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { RouteComponentProps } from 'react-router';
import { FilterOutlined } from '@ant-design/icons';

import '../../styles/items.scss';
import actions from '../../actions';
import { IItem, IState, IUser } from '../../reducers/interfaces';
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
  filter: 'weapon' | 'consumable' | 'wearable' | 'junk' | 'ammo' | 'note' | 'key' | 'misc' | undefined;
}

export class Items extends React.Component<IItemsProps, IItemsState> {
  state = {
    creatingItem: false,
    editingItem: null,
    searchString: '',
    filter: undefined,
  };

  get items() {
    const { searchString, filter } = this.state;

    const _searchString = searchString.toLowerCase();
    return this
      .props
      .items
      .filter((item: IItem) => {
        const { name, description, effect } = item;
        return (
          (name && name.toLowerCase().indexOf(_searchString) > -1)
          || (description && description.toLowerCase().indexOf(_searchString) > -1)
          || (effect && effect.toLowerCase().indexOf(_searchString) > -1)
        )
      })
      .filter((item: IItem) =>
        !filter || !item.type || item.type === filter
      );
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

    return (
      <>
        <ItemCreator
          visible={creatingItem}
          onClose={() => this.toggleCreatingItem(false)}
          onSubmit={this.onCreateItem}
        />
        <ItemCreator
          visible={!!editingItem}
          onClose={() => this.toggleEditingItem(null)}
          onSubmit={this.onCreateItem}
          item={editingItem || undefined}
        />
      </>
    )
  };

  onFilterChange = (e: RadioChangeEvent) =>
    this.setState({ filter: e.target.value });

  // filter: 'weapon' | 'consumable' | 'wearable' | 'junk' | 'ammo' | 'note' | 'key' | 'misc' | undefined;
  getFilters = () => {
    return (
      <Radio.Group
        onChange={this.onFilterChange}
        defaultValue={undefined}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Radio.Button>Всё</Radio.Button>
        <Radio.Button value="weapon">Оружие</Radio.Button>
        <Radio.Button value="consumable">Употребляемое</Radio.Button>
        <Radio.Button value="wearable">Одежда/Броня</Radio.Button>
        <Radio.Button value="junk">Мусор</Radio.Button>
        <Radio.Button value="note">Записки</Radio.Button>
        <Radio.Button value="key">Ключи</Radio.Button>
        <Radio.Button value="misc">Прочее</Radio.Button>
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
      </div>
    )
  };

  render = () => {
    const { loading, currentUser, uid } = this.props;

    return (
      <Card className="items">
        <Loader loading={loading}/>
        {this.getCreators()}
        {this.getControls()}
        <ItemsList
          items={this.items}
          uid={uid}
          currentUser={currentUser}
          toggleEditingItem={this.toggleEditingItem}
        />
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
