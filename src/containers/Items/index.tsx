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
}

interface IItemsState {
  searchValue: string;
  creatingItem: boolean;
}

export class Items extends React.Component<IItemsProps, IItemsState> {
  state = {
    searchValue: '',
    creatingItem: false,
  };

  toggleCreatingItem = () =>
    this.setState({ creatingItem: !this.state.creatingItem });

  componentDidMount = () => {
    actions.getItems({});
  };

  onCreateItem = (item: IItem) => {
    actions.createItem({ item });
    this.toggleCreatingItem();
  };

  render = () => {
    const { loading, items } = this.props;
    const { creatingItem } = this.state;

    return (
      <Card className="items">
        <Loader loading={loading}/>
        <div className="items-header">
          <div className="items-controls">
            <Button
              onClick={this.toggleCreatingItem}
            >
              Новый предмет
            </Button>
            <Input
              placeholder="Поиск предмета"
            />
          </div>
          <ItemCreator
            visible={creatingItem}
            onClose={this.toggleCreatingItem}
            onCreate={this.onCreateItem}
          />
        </div>
        <div className="items-body">
          {items.map((item: IItem) => (
            <Item item={item}/>
          ))}
        </div>
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
