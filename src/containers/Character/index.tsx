import React, { ChangeEvent, Component } from 'react';
import { withRouter } from 'react-router';
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
import { UserOutlined, ExportOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router';

import '../../styles/character.scss';
import { IState, IUser } from '../../reducers/interfaces';
import {
  initialCharacter,
  special as configSpecial,
  skills as configSkills,
  stats as configStats,
  subStats as configSubStats,
  ICharacter, TGifts,
} from './config';
import actions from '../../reducers/actions';
import {
  getCharacterChanges,
  getStateUser,
  processCharacterChanges,
  redirectToUserPage,
  set
} from '../../helpers/utils';

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
 * Level is capped to 30 lvl
 */
const maxExperience = 464999;

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
  };

  componentDidUpdate = (prevProps: ICharacterProps) => {
    const { character, user, currentUser, history } = this.props;
    if (prevProps.character !== character) {
      this.setState({ character });
    }
    redirectToUserPage(user, currentUser, history);
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

  onGiftSelect = (field: string) => () => {
    const { character } = this.state;
    // Avoid mutations
    const gifts: TGifts = [...character.gifts];
    const index = gifts.indexOf(field);
    if (index > -1) {
      gifts.splice(index, 1);
    } else if (gifts.length <= 2) {
      gifts.push(field);
    } else {
      return;
    }

    this.setState({
      character: {
        ...character,
        ...processCharacterChanges({}, { ...character, gifts }),
        gifts,
      }
    });
  };

  getSkills = (character: ICharacter) => {
    const { hasRight } = this.props;
    const { skills, gifts } = character;

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
            <Tooltip title={full} placement="left">
              <span
                className={`char-skills-label ${gifts.indexOf(field) > -1 ? 'gift' : ''}`}
                onClick={this.onGiftSelect(field)}
              >
                {label}
                </span>
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

  componentWillUnmount = () => this.onSave(true);

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
                min={1}
                max={95}
                readOnly
                disabled={!hasRight}
                value={Math.min(95, stats.armorClass.total)}
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
    if (!event || (typeof event !== 'number' && !event.target)) return;

    const rawValue = typeof event === 'number' ? event : (event.target.value || '');
    const value = typeof rawValue === 'number' ? Math.min(maxExperience, rawValue) : (rawValue || '');
    const character = set(this.state.character, field, value);
    const processedChar = processCharacterChanges({}, character);
    this.setState({
      character: {
        ...this.state.character,
        ...processedChar,
      }
    });
  };

  onSave = (hideErrors?: boolean) => {
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
    changes = getCharacterChanges(character, stateCharacter);
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

  changeBio = (e: ChangeEvent<HTMLTextAreaElement>) => this.setState({
    character: {
      ...this.state.character,
      bio: e.currentTarget.value
    }
  });

  downloadCharacter = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.props.character));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `character_${Date.now()}.json`);
    dlAnchorElem.click();
    dlAnchorElem.remove();
  };

  getControls = (character: ICharacter) => (
    <div className="char-controls">
      <Popconfirm
        title="Экспортировать персонажа?"
        okText="Да"
        cancelText="Отмена"
        onConfirm={this.downloadCharacter}
        disabled={!character}
      >
        <Button disabled={!character}>
          <ExportOutlined/>
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Сохранить изменения?"
        okText="Да"
        cancelText="Отмена"
        onConfirm={() => this.onSave()}
      >
        <Button>Сохранить</Button>
      </Popconfirm>
    </div>
  );

  getTitle = (user: IUser) => (
    <>
      <UserOutlined/>
      {' '}
      Персонаж игрока {user.nickname || user.uid}
    </>
  );

  render = () => {
    const { user, hasRight, character } = this.props;
    const stateCharacter = this.state.character;

    if (!user || !character || stateCharacter === initialCharacter) {
      return (
        <Spin spinning>
          <Empty description="Пользователь не загружен"/>
        </Spin>
      );
    }

    return (
      <Card
        className="char"
        title={this.getTitle(user)}
        extra={this.getControls(character)}
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
