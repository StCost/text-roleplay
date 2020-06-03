import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import {
  Card,
  Input,
  Button,
  Popconfirm,
  Switch,
  Modal,
} from 'antd';
import { RouteComponentProps } from 'react-router';

import { ClearOutlined, SettingOutlined } from '@ant-design/icons';

import '../../styles/settings.scss';
import actions from '../../reducers/actions';
import { IUser, defaultUser } from '../../reducers/interfaces';
import Avatar from '../../components/Avatar';
import Loader from '../../components/Loader/index';
import { getFullTime, getStateUser, redirectToUserPage } from '../../helpers/utils';
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
    const { user, uid, currentUser, history } = this.props;
    if (!user) {
      actions.getUser({ uid });
    }
    redirectToUserPage(user, currentUser, history);
  };

  componentDidUpdate = () => {
    const { user, currentUser, history } = this.props;
    redirectToUserPage(user, currentUser, history);
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
                readOnly={disabled}
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
              value={`${moment(parseInt(value)).fromNow()} (${getFullTime(parseInt(value))})`}
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
            value={value}
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

  getDeleteUser = () => {
    const { currentUser, uid } = this.props;

    const showModal = () =>
      Modal.confirm({
        title: 'Удалить?',
        content: 'Вы точно уверены, что хотите удалить все данные о пользователе? Это нельзя будет отменить. Необходимо будет так же удалить данные об аутентификации в Firebase',
        okText: '',
        cancelText: '',
        onOk: (close) => {
          actions.fullDeleteUser({ uid });
          close();
        }
      });

    return currentUser && currentUser.isSuperAdmin && (
      <Card title="Полное удаление пользователя">
        <Popconfirm
          title="Удалить все данные о пользователе. Вы уверены?"
          onConfirm={showModal}
          okText="Удалить"
          cancelText="Отмена"
        >
          <Button>Удалить</Button>
        </Popconfirm>
      </Card>
    );
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
        {this.getDeleteUser()}
      </Card>
    )
  }
}

export default withRouter(connect(getStateUser)(Settings));
