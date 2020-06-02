import React, { Component } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Card,
  Form,
  InputNumber,
  Input,
  Tooltip,
  Spin,
  Empty,
  message as notify,
  Button,
  Popconfirm,
} from 'antd';
import { Callbacks } from 'rc-field-form/lib/interface';

import '../../styles/status.scss';
import {
  ICharacter,
  ILimbs,
  initialCharacter,
  subStats as configSubStats,
  TLimb
} from '../Character/config';
import { IUser } from '../../reducers/interfaces';
import { getCharacterChanges, getStateUser, processCharacterChanges } from '../../helpers/utils';
import actions from "../../reducers/actions";
import BodyStatus from "./BodyStatus";

interface IStatusProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
  currentUser: IUser | null;
  character: ICharacter;
}

interface IStatusState {
  character: ICharacter;
}

class Status extends Component<IStatusProps, IStatusState> {
  state = { character: initialCharacter };

  componentDidMount = () => {
    const { character, uid, user } = this.props;
    if (!character) {
      actions.getCharacter({ uid });
    } else {
      this.setState({ character });
    }
    if (!user) {
      actions.getUser({ uid });
    }
  };

  componentDidUpdate = (prevProps: IStatusProps, prevState: IStatusState) => {
    if (prevProps.character !== this.props.character && this.state.character !== this.props.character)
      this.setState({ character: this.props.character });
  };

  onChange: Callbacks['onValuesChange'] = async (value, char) => {
    if (value.bio) {
      this.setState({
        character: {
          ...this.state.character,
          bio: value.bio,
        }
      });
    } else {
      this.setState({
        character: {
          ...this.state.character,
          ...await processCharacterChanges(value, char)
        }
      });
    }
  };


  onLimbClick = (name: string, state: TLimb) => {
    this.setState({
      character: {
        ...this.state.character,
        limbs: {
          ...this.state.character.limbs,
          [name]: state === 'crippled' ? 'fine' : 'crippled',
        }
      }
    })
  };

  getStatus = (limbs: ILimbs) => {
    return (
      <BodyStatus
        limbs={limbs}
        onClick={this.onLimbClick}
      />
    )
  };


  onSave = (hideErrors: boolean = false) => {
    const { uid, character } = this.props;
    const stateCharacter = this.state.character;

    if (!character) {
      if (!hideErrors)
        notify.error('Персонаж не загружен!');
      return;
    }

    let changes = getCharacterChanges(initialCharacter, stateCharacter);
    if (changes.length === 0) {
      if (!hideErrors)
        notify.error('В персонаже ничего не изменилось');
      return;
    }
    changes = getCharacterChanges(character || initialCharacter, stateCharacter);
    if (changes.length === 0) {
      if (!hideErrors)
        notify.error('В персонаже ничего не изменилось');
      return;
    }

    if (stateCharacter.stats.skillPoints < 0) {
      if (!hideErrors)
        notify.error('Очки Навыков (ОН) не могут быть отрицательными!');
      return;
    }

    notify.success('Персонаж сохранён');
    actions.setCharacter({
      uid,
      character: stateCharacter
    });
    actions.sendMessage({
      uid,
      message: `Характеристики персонажа изменены`,
      data: { characterChanges: changes }
    });
  };

  componentWillUnmount = () =>
    this.onSave(true);

  getMainStats = () => {
    const { hasRight, character } = this.props;

    return (
      <Card className="status-main-stats">
        <Form
          initialValues={character}
          onValuesChange={this.onChange}
        >
          <div className="status-main-stats-health">
            <div className="status-main-stats-hp">
              <span className="status-main-stats-hp-label">Очки Здоровья (ОЗ)</span>
              <div className="status-main-stats-hp-body">
                <Form.Item name={['stats', 'healthPoints']}>
                  <InputNumber
                    max={this.state.character.stats.maxHealthPoints || undefined}
                    min={-Math.floor(this.state.character.stats.maxHealthPoints / 2)}
                    disabled={!hasRight}
                  />
                </Form.Item>
                /
                <Form.Item name={['stats', 'maxHealthPoints']}>
                  <Input
                    readOnly
                    disabled={!hasRight}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="status-main-stats-ap-wrapper">
              <div className="status-main-stats-ap">
                <Tooltip title="Класс Брони (КБ)">
                  <div className="status-main-stats-ap-total">
                    КБ
                  </div>
                </Tooltip>
                <div className="status-main-stats-ap-change">
                  +/-
                </div>
                <div className="status-main-stats-ap-base">
                  Base
                </div>
              </div>
              <div className="status-main-stats-ap">
                <Form.Item name={['stats', 'armorClass', 'total']}>
                  <Input
                    className="status-main-stats-ap-total"
                    readOnly
                    disabled={!hasRight}
                  />
                </Form.Item>
                <Form.Item name={['stats', 'armorClass', 'change']}>
                  <InputNumber
                    className="status-main-stats-ap-change"
                    min={1}
                    max={95}
                    disabled={!hasRight}
                  />
                </Form.Item>
                <Form.Item name={['stats', 'armorClass', 'base']}>
                  <Input
                    className="status-main-stats-ap-base"
                    readOnly
                    disabled={!hasRight}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="status-main-stats-info">
            {configSubStats.slice(3).map(({ label, full, field }) => (
              <Tooltip
                key={field} title={full}>
                <div
                  className="status-main-stats-item"
                >
                  <span className="status-main-stats-item-label">{label}</span>
                  <Form.Item name={['stats', field]}>
                    <Input
                      className="status-main-stats-item-input"
                      readOnly
                      disabled={!hasRight}
                    />
                  </Form.Item>
                </div>
              </Tooltip>
            ))}
          </div>
        </Form>
      </Card>
    )
  };

  render = () => {
    const { user, currentUser, history, character } = this.props;

    if (user && user.uid && currentUser && currentUser.uid === user.uid && history.location.pathname === '/status') {
      return (
        <Redirect
          from="/status"
          to={`/${currentUser.uid}/status`}
          exact
        />
      )
    }

    if (!user || !character) {
      return (
        <Spin spinning>
          <Empty description="Пользователь не загружен"/>
        </Spin>
      );
    }

    return (
      <Card
        className="status"
        title={`Статус персонажа ${user.nickname}`}
        extra={
          <Popconfirm
            title="Сохранить изменения?"
            okText="Да"
            cancelText="Отмена"
            onConfirm={() => this.onSave()}
          >
            <Button>Сохранить</Button>
          </Popconfirm>
        }
      >
        {this.getStatus(this.state.character.limbs)}
        {this.getMainStats()}
      </Card>
    )
  }
}

export default withRouter(connect(getStateUser)(Status));
