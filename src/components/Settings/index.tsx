import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { User } from 'firebase';
import {
  Card,
  Input,
  Button,
  Empty,
} from 'antd';

import actions from '../../actions';
import { IState, ISettings } from '../../reducers/index';

interface IDashboardProps {
  settings: ISettings | false;
  loading: boolean;
  user: User | null;
}

export class Settings extends React.Component<IDashboardProps, ISettings> {
  state = {
    displayName: '',
  };

  componentDidMount = () => {
    const { user } = this.props;
    if (user) {
      actions.getSettings({ uid: user.uid });
    }
  };

  onChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) =>
    // @ts-ignore
    this.setState({ [field]: event.target.value });

  onSubmit = () => {
    const { user } = this.props;
    if (user) {
      actions.setSettings({
        uid: user.uid,
        settings: this.state,
      });
    }
  };

  render = () => {
    const { settings, loading } = this.props;

    if (!settings) {
      return (
        <Empty/>
      )
    }

    return (
      <Card>
        {Object
          .entries(settings)
          .map(([key, value]) => (
            <Card
              key={key}
              title={key}
            >
              <Input
                defaultValue={value}
                onChange={this.onChange(key)}
                disabled={loading}
              />
            </Card>
          ))
        }

        <Button
          onClick={this.onSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </Card>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { settings, loading, user } = state;
  return { settings, loading, user };
};

export default connect(mapStateToProps)(Settings);
