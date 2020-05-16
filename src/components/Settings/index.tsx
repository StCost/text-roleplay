import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Input,
  Button,
} from 'antd';
import { RouteComponentProps } from 'react-router';

import { ClearOutlined } from '@ant-design/icons';

import actions from '../../actions';
import { IState, IUser, defaultUser } from '../../reducers';
import Avatar from '../Avatar';
import Loader from '../Loader';

interface ISettingsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  uid: string;
}

export class Settings extends React.Component<ISettingsProps> {
  componentDidMount = () => {
    const { user } = this.props;
    if (user) {
      actions.getUser({ uid: user.uid });
    }
  };

  onChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...this.props.user,
      [field]: event.target.value,
    };

    this.setSettings(newSettings);
  };

  setSettings = (newSettings: {}) => {
    const { user } = this.props;
    if (user) {
      actions.setUser({
        uid: user.uid,
        user: newSettings,
      });
    }
  };

  clearAvatar = () => this.setSettings({
    ...this.props.user,
    avatar: '',
  });

  getField = (key: string, value: string, user: IUser) => {
    const { nickname } = user;

    switch (key) {
      case 'avatar':
        return (
          <div>
            <div style={{ display: 'flex' }}>
              <Input
                value={value}
                onChange={this.onChange(key)}
              />
              <Button
                onClick={this.clearAvatar}
                disabled={!value}
              >
                <ClearOutlined/>
              </Button>
            </div>
            <Avatar
              avatar={value}
              nickname={nickname}
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
          />
        )
    }
  };

  render = () => {
    const { user, loading } = this.props;

    return (
      <div className="settings">
        <Loader loading={loading}/>
        {Object
          .keys(defaultUser)
          .map((key: string) => {
            // @ts-ignore
            const field = this.getField(key, `${user[key]}`, user);
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
      </div>
    )
  }
}

const mapStateToProps = (state: IState, props: ISettingsProps) => {
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

export default connect(mapStateToProps)(Settings);
