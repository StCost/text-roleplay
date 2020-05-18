import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Input,
  Button,
  Popconfirm,
} from 'antd';
import { RouteComponentProps } from 'react-router';

import { ClearOutlined } from '@ant-design/icons';

import actions from '../../actions';
import { IState, IUser, defaultUser } from '../../reducers';
import Avatar from '../Avatar';
import Loader from '../Loader';
import { getFullTime } from "../../helpers/utils";

interface ISettingsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
}

export class Settings extends React.Component<ISettingsProps> {
  componentDidMount = () => {
    const { user, uid } = this.props;
    if (!user) {
      actions.getUser({ uid });
    }
  };

  onChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { user } = this.props;
    if (!user) return;

    const newSettings = {
      ...user,
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
    const { nickname = '' } = user;
    const { hasRight } = this.props;
    const disabled = !hasRight;

    switch (key) {
      case 'avatar':
        return (
          <div>
            <div style={{ display: 'flex' }}>
              <Input
                value={value}
                onChange={this.onChange(key)}
                readOnly={disabled}
              />
              <Popconfirm
                title="Очистить аватар?"
                onConfirm={this.clearAvatar}
                okText="Да"
                cancelText="Нет"
                icon={<ClearOutlined style={{ color: '#ff4d4f'}}/>}
                disabled={!value}
              >
                <Button
                  disabled={disabled || !value}
                  danger
                >
                  <ClearOutlined/>
                </Button>
              </Popconfirm>
            </div>
            <Avatar
              avatar={value}
              nickname={nickname}
              size={128}
              style={{ margin: '8px auto', display: 'block' }}
            />
          </div>
        );

      case 'uid':
        return (
          <Input
            value={value}
            readOnly
          />
        );

      case 'lastOnline':
        return (
          <Input
            value={getFullTime(parseInt(value))}
            readOnly
          />
        );

      default:
        return (
          <Input
            defaultValue={value}
            onChange={this.onChange(key)}
            readOnly={disabled}
          />
        )
    }
  };

  labels: {[key: string]: string} = {
    'avatar': 'Аватар',
    'nickname': 'Никнейм',
    'lastOnline': 'Последняя активность',
    'uid': 'UID',
  };

  render = () => {
    const { user, loading } = this.props;

    return (
      <Card
        className="settings"
        bordered={false}
        loading={user === undefined}
      >
        <Loader loading={loading}/>
        {user && Object
          .keys(defaultUser)
          .map((key: string) => {
            // @ts-ignore
            const field = this.getField(key, `${user[key] || ''}`, user);
            return field && (
              <Card
                className={key}
                key={key}
                title={this.labels[key]}
              >
                {field}
              </Card>
            )
          })

        }
      </Card>
    )
  }
}

const mapStateToProps = (state: IState, props: ISettingsProps) => {
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

export default connect(mapStateToProps)(Settings);
