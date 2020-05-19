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

interface IItemsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  uid: string;
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
    const { user, uid } = this.props;
    if (!user) {
      actions.getUser({ uid });
    }
  };

  render = () => {
    const { loading } = this.props;
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
            onCreate={(item: IItem) => {
              actions.createItem({ item });
              this.toggleCreatingItem();
            }}
          />
        </div>
        <div className="items-body">
        </div>
      </Card>
    )
  }
}

const mapStateToProps = (state: IState, props: IItemsProps) => {
  const { loading, users, currentUser } = state;

  const uid = new URLSearchParams(props.match.params).get('uid') || state.uid || '0';
  const user = users[uid];
  if (user && !user.uid && uid) {
    user.uid = uid;
  }

  return {
    loading,
    user,
    uid,
    hasRight: (!!user && !!currentUser) && (currentUser.uid === user.uid || !!currentUser.isAdmin),
  };
};

export default connect(mapStateToProps)(Items);
