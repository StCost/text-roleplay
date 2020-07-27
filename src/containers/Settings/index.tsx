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
  InputNumber,
  Tooltip,
} from 'antd';
import { RouteComponentProps } from 'react-router';
import { diff } from 'deep-object-diff';

import { ClearOutlined, SettingOutlined } from '@ant-design/icons';

import '../../styles/settings.scss';
import actions from '../../reducers/actions';
import { IUser, defaultUser } from '../../reducers/interfaces';
import Avatar from '../../components/Avatar';
import { getFullTime, getStateUser, redirectToUserPage } from '../../helpers/utils';
import InputUpload from '../../components/InputUpload';
import { addStatusChangeListener, removeStatusChangeListener } from '../../helpers/activity';

interface ISettingsProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
  currentUser: IUser | null;
}

export class Settings extends React.Component<ISettingsProps, IUser> {
  state = defaultUser;

  componentDidMount = () => {
    const { user, uid, currentUser, history } = this.props;
    if (!user)
      actions.getUser({ uid });
    else
      this.setState(user);
    redirectToUserPage(user, currentUser, history);

    addStatusChangeListener('afk', this.onSave);
    addStatusChangeListener('offline', this.onSave);
  };

  componentDidUpdate = (prevProps: ISettingsProps) => {
    const { user, currentUser, history } = this.props;
    redirectToUserPage(user, currentUser, history);

    if (this.props !== prevProps)
      this.setState(user);
  };

  componentWillUnmount = () => {
    removeStatusChangeListener('afk', this.onSave);
    this.onSave();
  };

  rawOnChange = (field: string, value: string | boolean | number, update?: boolean) => {
    const newSettings = {
      ...this.state,
      [field]: value,
    };

    this.setState(newSettings, () => update && this.onSave());
  };

  onSave = () => {
    const stateUser = this.state;
    const propsUser = this.props.user;

    if (propsUser && stateUser !== defaultUser && Object.keys(diff(stateUser, propsUser)).length > 0)
      this.setSettings(stateUser);
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

      case 'zoom':
        return currentUser && currentUser.uid === uid && (
          <Tooltip
            title="ВНИМАНИЕ! Изменяя размер, внешний вид страниц может кардинально измениться, а некоторые элементы станут перекрыты другими и будут не доступны. Изменяйте на свой страх и риск"
          >
            <InputNumber
              max={200}
              min={50}
              value={parseInt(value)}
              onChange={(value: number | undefined) => value !== undefined && this.rawOnChange(key, Math.min(200, Math.max(50, value || 0)))}
              onBlur={() => this.onSave()}
              onPressEnter={() => this.onSave()}
            />
          </Tooltip>
        );

      case 'enableDisabledFeatures':
        return currentUser && currentUser.uid === uid && (
          <>
            <Switch
              checked={!!value}
              onChange={(enabled: boolean) => this.rawOnChange(key, enabled, true)}
            />
            {' '}
            {value ? 'Активированы' : 'Деактивированы'}
          </>
        );

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
    'zoom': 'Размер приложения %',
    'enableDisabledFeatures': 'Дополнительные функции'
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
    const user = this.state;

    return user.uid && (
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
        {Object
          .keys(defaultUser)
          .map((key: string) => {
            const label = this.labels[key];
            const field = this.getField(key, `${user[key] || ''}`, user);
            return label && field && (
              <Card
                className={key}
                key={key}
                title={label}
              >
                {field}
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
