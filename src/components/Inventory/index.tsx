import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
} from 'antd';
import { RouteComponentProps } from 'react-router';

import './inventory.scss';
import actions from '../../actions';
import { IState, IUser, defaultUser } from '../../reducers';
import Loader from "../Loader";

interface IInventoryProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  uid: string;
}

export class Inventory extends React.Component<IInventoryProps> {
  componentDidMount = () => {
    const { user } = this.props;
    if (user) {
      actions.getUser({ uid: user.uid });
    }
  };

  render = () => {
    const { loading } = this.props;

    return (
      <Card className="inventory">
        <Loader loading={loading}/>
        <div className="inventory-body">

        </div>
      </Card>
    )
  }
}

const mapStateToProps = (state: IState, props: IInventoryProps) => {
  const { loading, users } = state;
  const uid = new URLSearchParams(props.match.params).get('uid') || state.uid || '0';

  return {
    loading,
    user: users[uid] || {
      ...defaultUser,
      uid,
    }
  };
};

export default connect(mapStateToProps)(Inventory);
