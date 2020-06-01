import React, { ChangeEvent, Component, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import {
  Card,
  Input,
  Spin,
  Button,
  Popconfirm,
  message as notify,
} from 'antd';
import { SendOutlined, UpOutlined, CloseOutlined } from '@ant-design/icons';
import { Store } from 'rc-field-form/lib/interface';

import '../styles/perks.scss';
import { getStateUser } from '../helpers/utils';
import actions from '../reducers/actions';
import { IPerk, IUser } from '../reducers/interfaces';

interface IPerksProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
  currentUser: IUser | null;
}

interface IPerksState {
  label: string;
  description: string;
}

class Perks extends Component<IPerksProps, IPerksState> {
  state = {
    label: '',
    description: '',
  };

  componentDidMount = () => {
    const { user, uid } = this.props;
    if (!user) {
      actions.getUser({ uid });
    }
  };

  scrollUp = () =>
    this.bodyRef && this.bodyRef.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });

  onSend = () => {
    const { uid, user } = this.props;
    const { description, label } = this.state;

    if (!user) return;
    if (!label) {
      notify.error('Необходимо заполнить название перка!');
      return;
    }
    if (label.length > 32) {
      notify.error('Название перка слишком длинное! Не больше 32-х символов');
      return;
    }
    if (!description) {
      notify.error('Необходимо заполнить описание перка!');
      return;
    }

    const perk: IPerk = {
      id: Date.now(),
      label,
      description,
    };

    const newUser: IUser = {
      ...user,
      perks: [
        ...(user.perks || []),
        perk,
      ],
    };

    actions.setUser({ uid, user: newUser });
    this.setState({
      label: '',
      description: '',
    });
  };

  onChange = (v: Store, allValues: Store) =>
    this.setState({
      label: allValues.label || '',
      description: allValues.description || '',
    });

  onDelete = (id: number) => () => {
    const { uid, user } = this.props;
    if (!user) return;

    const newUser: IUser = {
      ...user,
      perks: user.perks.filter((perk: IPerk) => perk.id !== id),
    };

    actions.setUser({ uid, user: newUser });
  };

  onChangeInput = (field: string) =>
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>
      // @ts-ignore
      this.setState({ [field]: event.target.value });

  onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      this.onSend();
    }
  };

  bodyRef: HTMLDivElement | null = null;
  render = () => {
    const { currentUser, user, history, loading, hasRight } = this.props;
    const { label, description } = this.state;

    if (user && user.uid && currentUser && currentUser.uid === user.uid && history.location.pathname === '/perks') {
      return (
        <Redirect
          from="/perks"
          to={`/${currentUser.uid}/perks`}
          exact
        />
      )
    }

    if (!user) return false;

    return (
      <Card
        className="perks"
        title={`Перки персонажа ${user.nickname}`}
      >
        <Spin spinning={loading}>
          <div
            className="perks-body"
            ref={ref => this.bodyRef = ref}
          >
            {(user.perks || []).map((perk: IPerk) => (
              <div
                className="perks-item"
                key={perk.id}
              >
                {hasRight && (
                  <Popconfirm
                    title="Вы уверены, что хотите удалить перк?"
                    okText="Удалить"
                    cancelText="Отмена"
                    onConfirm={this.onDelete(perk.id)}
                  >
                    <Button className="perks-item-close">
                      <CloseOutlined/>
                    </Button>
                  </Popconfirm>
                )}
                <div className="perks-item-label">{perk.label}</div>
                <div className="perks-item-description">{perk.description}</div>
              </div>
            ))}
          </div>
          <div className="perks-controls">
            <Button onClick={this.scrollUp}>
              <UpOutlined/>
            </Button>
            <div className="perks-controls-form">
              <Input
                placeholder="Название перка"
                disabled={!hasRight}
                onChange={this.onChangeInput('label')}
                onPressEnter={this.onSend}
                value={label}
              />
              <Input.TextArea
                placeholder="Описание перка"
                onKeyDown={this.onKeyDown}
                disabled={!hasRight}
                onChange={this.onChangeInput('description')}
                value={description}
              />
            </div>
            <Button
              disabled={!hasRight}
              onClick={this.onSend}
            >
              <SendOutlined/>
            </Button>
          </div>
        </Spin>
      </Card>
    )
  }
}

export default withRouter(connect(getStateUser)(Perks));
