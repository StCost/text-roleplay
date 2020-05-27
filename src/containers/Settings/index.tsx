import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Card,
  Input,
  Button,
  Popconfirm, Switch,
} from 'antd';
import { RouteComponentProps } from 'react-router';

import { ClearOutlined, SettingOutlined } from '@ant-design/icons';

import actions from '../../reducers/actions';
import { IState, IUser, defaultUser } from '../../reducers/interfaces';
import Avatar from '../../components/Avatar';
import Loader from '../../components/Loader/index';
import { getFullTime } from '../../helpers/utils';
import InputUpload from "../../components/InputUpload";

interface ISettingsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
  currentUser: IUser | null;
}

export class Settings extends React.Component<ISettingsProps> {
  componentDidMount = () => {
    const { user, uid } = this.props;
    if (!user) {
      actions.getUser({ uid });
    }
  };

  rawOnChange = (field: string, value: string | boolean) => {
    const { user } = this.props;
    if (!user) return;

    const newSettings = {
      ...user,
      [field]: value,
    };

    this.setSettings(newSettings);
  };

  onChange = (field: string) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      this.rawOnChange(field, event.target.value);

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
    const { hasRight, currentUser, uid } = this.props;
    const disabled = !hasRight;

    switch (key) {
      case 'avatar':
        return (
          <div>
            <div style={{ display: 'flex' }}>
              <InputUpload
                placeholder="Введите сообщение"
                onChange={this.onChange(key)}
                value={value}
                disabled={disabled}
                onUpload={(avatar: string) => {
                  actions.notify({ message: 'Файл успешно загружен!' });
                  this.rawOnChange(key, avatar);
                }}
              />
              <Popconfirm
                title="Очистить аватар?"
                onConfirm={this.clearAvatar}
                okText="Да"
                cancelText="Нет"
                icon={<ClearOutlined style={{ color: '#ff4d4f' }}/>}
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
              nickname={nickname || uid}
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
        return value
          ? (
            <Input
              value={getFullTime(parseInt(value))}
              readOnly
            />
          ) : (
            'Пользователь ещё не был активен'
          );

      case 'approved':
        return <>
          {(hasRight && (currentUser && currentUser.uid !== uid)) && (
            <>
              <Switch
                checked={!!value}
                onChange={(isAdmin: boolean) => this.rawOnChange(key, isAdmin)}
              />
            </>
          )}
          {value ? 'Активирован' : 'Не активирован'}
        </>;

      case 'isAdmin':
        return <>
          {
            (hasRight && (currentUser && currentUser.uid !== uid)) &&
            <>
              <Switch
                checked={!!value}
                onChange={(isAdmin: boolean) => this.rawOnChange(key, isAdmin)}
              />
            </>
          }
          {value ? 'Имеются' : 'Отсутствуют'}
        </>;

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

  labels: { [key: string]: string } = {
    'avatar': 'Аватар',
    'nickname': 'Никнейм',
    'lastOnline': 'Последняя активность',
    'isAdmin': 'Права админа',
    'uid': 'UID',
    'approved': 'Активирован',
  };

  render = () => {
    const { user, loading } = this.props;

    return (
      <Card
        className="settings"
        bordered={false}
        loading={user === undefined}
        title={user && (
          <>
            <SettingOutlined/>
            {' '}
            Настройки игрока {user.nickname || user.uid}
          </>
        )}
      >
        <Loader loading={loading}/>
        {user && Object
          .keys(defaultUser)
          .map((key: string) => {
            const label = this.labels[key];
            return label && (
              <Card
                className={key}
                key={key}
                title={label}
              >
                {this.getField(key, `${user[key] || ''}`, user)}
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

  const uid = new URLSearchParams(props.match.params).get('uid') || state.uid || localStorage.getItem('uid') || '0';
  const user = users[uid];
  if (user && !user.uid && uid) {
    user.uid = uid;
  }

  return {
    loading,
    user,
    uid,
    hasRight: (!!user && !!currentUser) && (currentUser.uid === user.uid || !!currentUser.isAdmin),
    currentUser,
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
