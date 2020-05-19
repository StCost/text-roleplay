import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  Input,
} from 'antd';
import { RouteComponentProps } from 'react-router';

import '../../styles/items.scss';
import actions from '../../actions';
import { IItem, IState, IUser } from '../../reducers/interfaces';
import Loader from '../../components/Loader';
import ItemCreator from './ItemCreator';
import Item from "../../components/Item";

interface IItemsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  uid: string;
  items: IItem[];
  currentUser: IUser | null;
}

interface IItemsState {
  searchValue: string;
  creatingItem: boolean;
  editingItem: IItem | null;
}

export class Items extends React.Component<IItemsProps, IItemsState> {
  state = {
    searchValue: '',
    creatingItem: false,
    editingItem: null,
  };

  toggleCreatingItem = (creatingItem: boolean = !this.state.creatingItem) =>
    this.setState({ creatingItem });

  toggleEditingItem = (item?: IItem | null) =>
    this.setState({ editingItem: item || null });

  componentDidMount = () => {
    actions.getItems({});
  };

  onCreateItem = (item: IItem) => {
    actions.setItem({ item });
    this.toggleCreatingItem(false);
    this.toggleEditingItem(null);
  };

  items = () => {
    const controls = (item: IItem) => (
      <div>
        <Button>
          Удалить
        </Button>
        <Button onClick={() => this.toggleEditingItem(item)}>
          Редактировать
        </Button>
      </div>
    );

    return (
      <div className="items-body">
        {this.props.items.map((item: IItem) => (
          <Item
            key={item.id + item.time}
            item={item}
            footer={controls}
          />
        ))}
      </div>
    )
  };

  render = () => {
    const { loading } = this.props;
    const { creatingItem, editingItem } = this.state;

    return (
      <Card className="items">
        <Loader loading={loading}/>
        <div className="items-header">
          <div className="items-controls">
            <Button onClick={() => this.toggleCreatingItem(true)}>
              Новый предмет
            </Button>
            {/*<Input*/}
              {/*placeholder="Поиск предмета"*/}
            {/*/>*/}
          </div>
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
        </div>
        {this.items()}
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
