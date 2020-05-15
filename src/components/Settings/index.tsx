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

import { ClearOutlined } from '@ant-design/icons';

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

  onChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) =>
    // @ts-ignore
    this.setState({ [field]: event.target.value });

  getNewSettings = () => {
    const { settings } = this.props;

    const newSettings = {};
    Object.entries(settings).forEach(([key, value]) => {
      // @ts-ignore
      newSettings[key] = this.state[key] || value;
    });
    return newSettings;
  };

  onSubmit = () => {
    this.setSettings(this.getNewSettings());
  };

  setSettings = (newSettings: {}) => {
    const { user } = this.props;
    if (user) {
      actions.setSettings({
        uid: user.uid,
        settings: newSettings,
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
            <div style={{ display: 'flex' }}>
              <Input
                defaultValue={avatar || value}
                onChange={this.onChange(key)}
                disabled={loading}
              />
              <Button
                onClick={() => this.setSettings({
                  ...this.getNewSettings(),
                  avatar: '',
                })}
                disabled={!(avatar || value)}
              >
                <ClearOutlined/>
              </Button>
            </div>
            <Avatar
              avatar={avatar || value}
              nickname={nickname || (settings && settings.nickname) || ''}
              size={128}
              style={{ margin: '8px auto', display: 'block' }}
            />
          </div>
        );

      // Don't display UID and lastOnline editor
      case 'uid':
      case 'lastOnline':
        return false;

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
            .map(([key, value]) => {
              const field = this.getField(key, value);
              return field && (
                <Card
                  key={key}
                  title={key.toUpperCase()}
                >
                  {field}
                </Card>
              )
            })
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
