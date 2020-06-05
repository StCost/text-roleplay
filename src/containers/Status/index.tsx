import React, { ChangeEvent, Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { IdcardOutlined, SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import {
  Card,
  InputNumber,
  Input,
  Tooltip,
  Empty,
  message as notify,
  Button,
  Popconfirm,
} from 'antd';

import '../../styles/status.scss';
import {
  ICharacter,
  ILimbs,
  initialCharacter,
  subStats as configSubStats,
  TLimb
} from '../Character/config';
import { IUser } from '../../reducers/interfaces';
import {
  getCharacterChanges,
  getStateUser,
  processCharacterChanges,
  redirectToUserPage,
  set
} from '../../helpers/utils';
import actions from '../../reducers/actions';
import BodyStatus from './BodyStatus';
import { addStatusChangeListener, removeStatusChangeListener } from '../../helpers/activity';

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
    const { character, uid, user, currentUser, history } = this.props;
    if (!character) {
      actions.getCharacter({ uid });
    } else {
      this.setState({ character });
    }
    if (!user) {
      actions.getUser({ uid });
    }
    redirectToUserPage(user, currentUser, history);
    addStatusChangeListener('afk', this.onSave);
    addStatusChangeListener('offline', this.onSave);
  };

  componentDidUpdate = (prevProps: IStatusProps) => {
    const { user, currentUser, history, character } = this.props;
    if (prevProps.character !== character && this.state.character !== character)
      this.setState({ character });
    redirectToUserPage(user, currentUser, history);
  };

  componentWillUnmount = () => {
    this.onSave();
    removeStatusChangeListener('afk', this.onSave);
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
    const { hasRight } = this.props;
    return limbs && (
      <BodyStatus
        limbs={limbs}
        onClick={hasRight ? this.onLimbClick : undefined}
        hasRight={hasRight}
      />
    )
  };


  onSave = async (showError: boolean = false) => {
    const { uid, character } = this.props;
    const stateCharacter = this.state.character;

    if (!character) {
      if (showError)
        notify.error('Персонаж не загружен!');
      return;
    }

    let changes = getCharacterChanges(initialCharacter, stateCharacter);
    if (changes.length === 0) {
      if (showError)
        notify.error('В персонаже ничего не изменилось');
      return;
    }
    changes = getCharacterChanges(character || initialCharacter, stateCharacter);
    if (changes.length === 0) {
      if (showError)
        notify.error('В персонаже ничего не изменилось');
      return;
    }

    if (stateCharacter.stats.skillPoints < 0) {
      if (showError)
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

  onChange = (field: string | string[]) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | number | undefined) => {
    if (!event) return;

    const value = typeof event === 'number' ? event : event.currentTarget.value;
    const character = set(this.state.character, field, value);
    const processedChar = processCharacterChanges({}, character);
    this.setState({
      character: {
        ...this.state.character,
        ...processedChar,
      }
    });
  };

  getMainStats = (character: ICharacter) => {
    const { hasRight } = this.props;
    let { stats } = character;

    return stats && (
      <Card className="status-main-stats">
        <div className="status-main-stats-health">
          <div className="status-main-stats-hp">
            <span className="status-main-stats-hp-label">Очки Здоровья (ОЗ)</span>
            <div className="status-main-stats-hp-body">
              <InputNumber
                max={stats.maxHealthPoints || 1000}
                min={-Math.floor(stats.maxHealthPoints / 2)}
                disabled={!hasRight}
                value={stats.healthPoints}
                onChange={this.onChange('stats.healthPoints')}
              />
              /
              <Input
                value={stats.maxHealthPoints}
                readOnly
                disabled={!hasRight}
              />
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
              <Input
                className="status-main-stats-ap-total"
                readOnly
                disabled={!hasRight}
                value={Math.min(95, stats.armorClass.total)}
              />
              <InputNumber
                className="status-main-stats-ap-change"
                min={1}
                max={95}
                disabled={!hasRight}
                value={stats.armorClass.change}
                onChange={this.onChange('stats.armorClass.change')}
              />
              <Input
                className="status-main-stats-ap-base"
                readOnly
                disabled={!hasRight}
                value={stats.armorClass.base}
              />
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
                <Input
                  className="status-main-stats-item-input"
                  readOnly
                  disabled={!hasRight}
                  value={stats[field]}
                  onChange={this.onChange(['stats', field])}
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </Card>
    )
  };

  getControls = () => (
    <div className="status-controls">
      <Popconfirm
        title="Откатить не сохранённые изменения?"
        okText="Откатить"
        cancelText="Отмена"
        onConfirm={() => {
          this.setState({ character: {...this.props.character} });
          notify.success('Успешно откачено!')
        }}
      >
        <Button>
          <RollbackOutlined />
          Откатить
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Сохранить изменения?"
        okText="Да"
        cancelText="Отмена"
        onConfirm={() => this.onSave(true)}
      >
        <Button className="status-save-button">
          <SaveOutlined/>
          Сохранить
        </Button>
      </Popconfirm>
    </div>
  );

  render = () => {
    const { user, character, loading, hasRight } = this.props;
    const stateCharacter = this.state.character;

    if (!user || !character || loading) {
      return (
          <Empty description="Пользователь не загружен"/>
      );
    }

    return (
      <Card
        className="status"
        extra={hasRight && this.getControls()}
        title={(
          <>
            <IdcardOutlined/>
            {' '}
            Статус персонажа {user.nickname}
          </>
        )}
      >
        {this.getStatus(stateCharacter.limbs)}
        {this.getMainStats(stateCharacter)}
      </Card>
    )
  }
}

export default withRouter(connect(getStateUser)(Status));
