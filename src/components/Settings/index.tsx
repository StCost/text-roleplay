import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { User } from 'firebase';
import {
  Card,
  Input,
  Button,
  Empty,
  Spin,
} from 'antd';

import actions from '../../actions';
import { IState, ISettings, defaultSettings } from '../../reducers';
import Avatar from '../Avatar';

interface ISettingsProps {
  settings: ISettings | false;
  loading: boolean;
  user: User | null;
}

export class Settings extends React.Component<ISettingsProps, ISettings> {
  state = defaultSettings;

  componentDidMount = () => {
    const { user } = this.props;
    if (user) {
      actions.getSettings({ uid: user.uid });
    }
  };

  componentDidUpdate = () => {
    if (this.props.settings && this.state !== this.props.settings) {
      // this.setState(this.props.settings)
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

  getField = (key: string, value: string) => {
    const { loading, settings } = this.props;
    const { avatar, nickname } = this.state;

    switch (key) {
      case 'avatar':
        return (
          <div>
            <Input
              defaultValue={value}
              onChange={this.onChange(key)}
              disabled={loading}
            />
            <Avatar
              avatar={avatar}
              nickname={nickname || (settings && settings.nickname) || ''}
              size={128}
              style={{ margin: '8px auto', display: 'block' }}
            />
          </div>
        );

      default:
        return (
          <Input
            defaultValue={value}
            onChange={this.onChange(key)}
            disabled={loading}
          />
        )
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
      <div>
        <Spin spinning={loading}>
          {Object
            .entries(settings)
            .map(([key, value]) => (
              <Card
                key={key}
                title={key.toUpperCase()}
              >
                {this.getField(key, value)}
              </Card>
            ))
          }
        </Spin>

        <Button
          onClick={this.onSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { settings, loading, user } = state;
  return { settings, loading, user };
};

export default connect(mapStateToProps)(Settings);
