import React, { ChangeEvent, Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  Card,
  Input,
  InputNumber,
  Tooltip,
  Empty,
  Spin,
  Button,
  Popconfirm,
  message as notify,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router';

import '../../styles/character.scss';
import { IState, IUser } from '../../reducers/interfaces';
import {
  initialCharacter,
  special as configSpecial,
  skills as configSkills,
  stats as configStats,
  subStats as configSubStats,
  ICharacter,
} from './config';
import actions from '../../reducers/actions';
import { getCharacterChanges, getStateUser, processCharacterChanges, set } from '../../helpers/utils';

interface ICharacterProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
  currentUser: IUser | null;
  character: ICharacter;
}

interface ICharacterState {
  character: ICharacter;
  update: boolean;
}

/**
 * This component is most complex one in whole project
 * Beware of complex methods and data types
 */
class Character extends Component<ICharacterProps, ICharacterState> {
  state = {
    character: initialCharacter,
    update: false,
  };

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

  componentDidUpdate = (prevProps: ICharacterProps) => {
    if (prevProps.character !== this.props.character) {
      this.setState({ character: {...this.props.character} });
    }
  };

  getSpecial = (character: ICharacter) => {
    const { hasRight } = this.props;
    const { special } = character;

    return (
      <Card className="char-special">
        <div className="char-special-item">
          <span className="char-special-label"/>
          <div className="char-special-input total">
            Total
          </div>
          <div className="char-special-input">
            +/-
          </div>
          <div className="char-special-input">
            Base
          </div>
        </div>
        {configSpecial.map(({ label, full, field }) => (
          <div
            key={label}
            className="char-special-item"
          >
            <Tooltip title={full}>
              <span className="char-special-label">{label}</span>
            </Tooltip>
            <Input
              className="char-special-input total"
              readOnly
              min={0}
              max={9}
              disabled={!hasRight}
              value={special[field].total}
            />
            <InputNumber
              className="char-special-input"
              min={0}
              max={9}
              disabled={!hasRight}
              value={special[field].change}
              onChange={this.onChange(['special', field, 'change'])}
            />
            <InputNumber
              className="char-special-input"
              min={0}
              max={9}
              disabled={!hasRight}
              value={special[field].base}
              onChange={this.onChange(['special', field, 'base'])}
            />
          </div>
        ))}
      </Card>
    )
  };


  getSkills = (character: ICharacter) => {
    const { hasRight } = this.props;
    const { skills } = character;

    return (
      <Card className="char-skills">
        <div className="char-skills-item">
          <span className="char-skills-label"/>
          <div className="char-skills-input total">
            Total
          </div>
          <div className="char-skills-input">
            +/-
          </div>
          <div className="char-skills-input">
            Base
          </div>
        </div>
        {configSkills.map(({ label, full, formula, field }) => (
          <div
            key={field}
            className="char-skills-item"
          >
            <Tooltip title={full}>
              <span className="char-skills-label">{label}</span>
            </Tooltip>
            <Input
              className="char-skills-input"
              readOnly
              disabled={!hasRight}
              value={skills[field].total}
            />
            <InputNumber
              className="char-skills-input"
              disabled={!hasRight}
              min={1}
              max={95}
              value={skills[field].change}
              onChange={this.onChange(['skills', field, 'change'])}
            />
            <Tooltip title={formula}>
              <Input
                className="char-skills-input"
                readOnly
                disabled={!hasRight}
                value={skills[field].base}
                onChange={this.onChange(['skills', field, 'base'])}
              />
            </Tooltip>
          </div>
        ))}
      </Card>
    )
  };

  getStats = (character: ICharacter) => {
    const { hasRight } = this.props;
    const { stats } = character;

    return (
      <Card className="char-stats">
        {configStats.map(({ label, full, field, getBase }) => (
          <div
            key={field}
            className="char-stats-item"
          >
            <Tooltip title={full}>
              <span className="char-stats-label">{label}</span>
            </Tooltip>
            {field === 'wounds'
              ? (
                <Input.TextArea
                  className="char-stats-input"
                  disabled={!hasRight}
                  value={stats[field]}
                  onChange={this.onChange(['stats', field])}
                />
              ) : (
                !!getBase
                  ? (
                    <Input
                      className="char-stats-input"
                      readOnly
                      disabled={!hasRight}
                      value={stats[field]}
                    />
                  ) : (
                    <InputNumber
                      className="char-stats-input"
                      min={1}
                      max={Number.MAX_SAFE_INTEGER}
                      disabled={!hasRight}
                      value={stats[field]}
                      onChange={this.onChange(['stats', field])}
                    />
                  )
              )}
          </div>))}
      </Card>
    )
  };

  getMainStats = (character: ICharacter) => {
    const { hasRight } = this.props;
    const { stats } = character;

    return (
      <Card className="char-main-stats">
        <div className="char-main-stats-health">
          <div className="char-main-stats-hp">
            <span className="char-main-stats-hp-label">Очки Здоровья (ОЗ)</span>
            <div className="char-main-stats-hp-body">
              <Input
                max={stats.maxHealthPoints || undefined}
                min={-Math.floor(stats.maxHealthPoints / 2)}
                readOnly
                disabled={!hasRight}
                value={stats.healthPoints}
              />
              /
              <Input
                value={stats.maxHealthPoints}
                readOnly
                disabled={!hasRight}
              />
            </div>
          </div>
          <div className="char-main-stats-ap-wrapper">
            <div className="char-main-stats-ap">
              <Tooltip title="Класс Брони (КБ)">
                <div className="char-main-stats-ap-total">
                  КБ
                </div>
              </Tooltip>
              <div className="char-main-stats-ap-change">
                +/-
              </div>
              <div className="char-main-stats-ap-base">
                Base
              </div>
            </div>
            <div className="char-main-stats-ap">
              <Input
                className="char-main-stats-ap-total"
                readOnly
                disabled={!hasRight}
                value={stats.armorClass.total}
              />
              <Input
                className="char-main-stats-ap-change"
                readOnly
                disabled={!hasRight}
                min={1}
                max={95}
                value={stats.armorClass.change}
              />
              <Input
                className="char-main-stats-ap-base"
                readOnly
                disabled={!hasRight}
                value={stats.armorClass.base}
              />
            </div>
          </div>
        </div>
        <div className="char-main-stats-info">
          {configSubStats.slice(3).map(({ label, full, field }) => (
            <div
              key={field}
              className="char-main-stats-item"
            >
              <Tooltip title={full}>
                <span className="char-main-stats-item-label">{label}</span>
              </Tooltip>
              <Input
                className="char-main-stats-item-input"
                readOnly
                disabled={!hasRight}
                value={stats[field]}
              />
            </div>
          ))}
        </div>
      </Card>
    )
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

  onSave = () => {
    const { uid, character } = this.props;
    const stateCharacter = this.state.character;

    if (!character) {
      notify.error('Персонаж не загружен!');
      return;
    }

    let changes = getCharacterChanges(initialCharacter, stateCharacter);
    if (changes.length === 0) {
      notify.error('В персонаже ничего не изменилось');
      return;
    }
    changes = getCharacterChanges(character, stateCharacter);
    if (changes.length === 0) {
      notify.error('В персонаже ничего не изменилось');
      return;
    }

    if (stateCharacter.stats.skillPoints < 0) {
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

  changeBio = (e: ChangeEvent<HTMLTextAreaElement>) => this.setState({
    character: {
      ...this.state.character,
      bio: e.currentTarget.value
    }
  });

  render = () => {
    const { user, hasRight, currentUser, history, character } = this.props;
    const stateCharacter = this.state.character;

    if (!user || !character || stateCharacter === initialCharacter) {
      return (
        <Spin spinning>
          <Empty description="Пользователь не загружен"/>
        </Spin>
      );
    }

    if (user && user.uid && currentUser && currentUser.uid === user.uid && history.location.pathname === '/stats') {
      return (
        <Redirect
          from="/stats"
          to={`/${currentUser.uid}/stats`}
          exact
        />
      )
    }

    return (
      <Card
        className="char"
        title={(
          <>
            <UserOutlined/>
            {' '}
            Персонаж игрока {user.nickname || user.uid}
          </>
        )}
        extra={
          <Popconfirm
            title="Сохранить изменения?"
            okText="Да"
            cancelText="Отмена"
            onConfirm={this.onSave}
          >
            <Button>Сохранить</Button>
          </Popconfirm>
        }
      >
        <div className="char-bio">
          <Input.TextArea
            // This Input is not a part of form in order to optimize changes a bit
            disabled={!hasRight}
            minLength={3}
            value={stateCharacter.bio}
            onChange={this.changeBio}
          />
        </div>
        <div>
          {this.getMainStats(stateCharacter)}
        </div>
        <div>
          <div>
            {this.getSpecial(stateCharacter)}
            {this.getStats(stateCharacter)}
          </div>
          <div>
            {this.getSkills(stateCharacter)}
          </div>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = (state: IState, props: RouteComponentProps) => {
  const charState = getStateUser(state, props);
  const { user, currentUser, character } = charState;
  const newHasRight = (!!user && !!currentUser) && ((currentUser.uid === user.uid && (character && !character.static)) || !!currentUser.isSuperAdmin);

  return {
    ...charState,
    hasRight: newHasRight,
  }
};

export default withRouter(connect(mapStateToProps)(Character));
