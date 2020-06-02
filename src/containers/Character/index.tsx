import React, { ChangeEvent, Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  Form,
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
import { Callbacks, Store } from 'rc-field-form/lib/interface';
import { RouteComponentProps } from 'react-router';
import { diff } from 'deep-object-diff';

import '../../styles/character.scss';
import { IState, IUser } from '../../reducers/interfaces';
import {
  initialCharacter,
  special as configSpecial,
  skills as configSkills,
  stats as configStats,
  subStats as configSubStats,
  ICharacteristic,
  ICharacter,
  IStats,
  getConfigByField,
  IField,
  ICharacterChanges,
} from './config';
import actions from '../../reducers/actions';
import { getStateUser } from '../../helpers/utils';

interface ICharacterProps extends RouteComponentProps {
  loading: boolean;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
  currentUser: IUser | null;
  character: ICharacter;
}

/**
 * This component is most complex one in whole project
 * Beware of complex methods and data types
 */
class Character extends Component<ICharacterProps, ICharacter> {
  state = initialCharacter;

  componentDidMount = () => {
    const { character, uid, user } = this.props;
    if (!character) {
      actions.getCharacter({ uid });
    }
    if (!user) {
      actions.getUser({ uid });
    }
  };

  getSpecial = () => {
    const { hasRight } = this.props;

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
            <Form.Item name={['special', field, 'total']}>
              <Input
                className="char-special-input total"
                readOnly
                min={0}
                max={9}
                disabled={!hasRight}
              />
            </Form.Item>
            <Form.Item name={['special', field, 'change']}>
              <InputNumber
                className="char-special-input"
                min={0}
                max={9}
                disabled={!hasRight}
              />
            </Form.Item>
            <Form.Item name={['special', field, 'base']}>
              <InputNumber
                className="char-special-input"
                min={0}
                max={9}
                disabled={!hasRight}
              />
            </Form.Item>
          </div>
        ))}
      </Card>
    )
  };


  getSkills = () => {
    const { hasRight } = this.props;

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
            <Form.Item name={['skills', field, 'total']}>
              <Input
                className="char-skills-input"
                readOnly
                disabled={!hasRight}
              />
            </Form.Item>
            <Form.Item name={['skills', field, 'change']}>
              <InputNumber
                className="char-skills-input"
                disabled={!hasRight}
                min={1}
                max={95}
              />
            </Form.Item>
            <Tooltip title={formula}>
              <Form.Item name={['skills', field, 'base']}>
                <Input
                  className="char-skills-input"
                  readOnly
                  disabled={!hasRight}
                />
              </Form.Item>
            </Tooltip>
          </div>
        ))}
      </Card>
    )
  };

  getStats = () => {
    const { hasRight } = this.props;

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
            <Form.Item name={['stats', field]}>
              {field === 'wounds'
                ? (
                  <Input.TextArea
                    className="char-stats-input"
                    disabled={!hasRight}
                  />
                ) : (
                  !!getBase
                    ? (
                      <Input
                        className="char-stats-input"
                        readOnly
                        disabled={!hasRight}
                      />
                    ) : (
                      <InputNumber
                        className="char-stats-input"
                        min={1}
                        max={Number.MAX_SAFE_INTEGER}
                        disabled={!hasRight}
                      />
                    )
                )}
            </Form.Item>
          </div>))}
      </Card>
    )
  };

  getMainStats = () => {
    const { hasRight } = this.props;

    return (
      <Card className="char-main-stats">
        <div className="char-main-stats-health">
          <div className="char-main-stats-hp">
            <span className="char-main-stats-hp-label">Очки Здоровья (ОЗ)</span>
            <div className="char-main-stats-hp-body">
              <Form.Item name={['stats', 'healthPoints']}>
                <InputNumber
                  max={this.state.stats.maxHealthPoints || undefined}
                  min={-Math.floor(this.state.stats.maxHealthPoints / 2)}
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
              <Form.Item name={['stats', 'armorClass', 'total']}>
                <Input
                  className="char-main-stats-ap-total"
                  readOnly
                  disabled={!hasRight}
                />
              </Form.Item>
              <Form.Item name={['stats', 'armorClass', 'change']}>
                <InputNumber
                  className="char-main-stats-ap-change"
                  min={1}
                  max={95}
                  disabled={!hasRight}
                />
              </Form.Item>
              <Form.Item name={['stats', 'armorClass', 'base']}>
                <Input
                  className="char-main-stats-ap-base"
                  readOnly
                  disabled={!hasRight}
                />
              </Form.Item>
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
              <Form.Item name={['stats', field]}>
                <Input
                  className="char-main-stats-item-input"
                  readOnly
                  disabled={!hasRight}
                />
              </Form.Item>
            </div>
          ))}
        </div>
      </Card>
    )
  };

  onChange: Callbacks['onValuesChange'] = async (value, char) => {
    if (value.bio) {
      this.setState({ bio: value.bio });
    } else {
      this.setState(await this.processChar(value, char));
    }
  };

  // TODO Needs refactor for sure
  processChar = async (value: Store, char: Store) => {
    const { special, skills, stats } = char;

    if (!value.bio) {
      const specialTotal: { [key: string]: number } = {};
      configSpecial.forEach(({ field, label }) => {
        const value: ICharacteristic = special[field];
        const total = Math.max(0, Math.min(9, value.base + value.change));
        special[field] = {
          ...value,
          total,
        };
        specialTotal[label.toLowerCase()] = total;
      });

      stats.spentSkillPoints = 0;
      configSkills.forEach(({ field, getBase }) => {
        const value: ICharacteristic = skills[field];
        const change = Math.max(1, value.change);
        const base = Math.max(1, getBase ? getBase(specialTotal, stats) : 1);
        const total = Math.max(1, Math.min(95, base + change));

        skills[field] = {
          change,
          base,
          total,
        };
        stats.spentSkillPoints += (value.change - 1);
      });

      [...configStats, ...configSubStats].forEach(({ field, getBase }) => {
        if (getBase) {
          if (field === 'armorClass') {
            const base = getBase(specialTotal, stats);
            const change = stats[field].change;
            stats[field] = {
              change,
              base,
              total: change + base,
            }
          } else {
            stats[field] = Math.floor(getBase(specialTotal, stats));
          }
        }
      });
    }

    return {
      special,
      skills,
      stats,
    };
  };

  getChanges = (beforeChar: ICharacter, afterChar: ICharacter) => {
    const before = diff(afterChar, beforeChar);
    const after = diff(beforeChar, afterChar);

    const changes: ICharacterChanges[] = [];

    Object.entries(before).forEach(([name, characteristic]: [string, string | ICharacteristic | IStats]) => {
      if (name === 'bio' && typeof characteristic === 'string') {
        changes.push({
          label: 'Bio',
          full: 'Биография',
          before: characteristic,

          after: after[name],
        });
        return;
      }

      if (typeof characteristic === 'object' && !Array.isArray(characteristic) && after[name])
        Object.entries(characteristic).forEach(([field, value]: [string, ICharacteristic]) => {
          const afterValue = after[name][field];
          const config: IField | undefined = getConfigByField(field);
          if (config) {
            changes.push({
              label: config.label,
              full: config.full,
              before: value,
              after: afterValue,
            });
          }
        })
    });

    return changes;
  };

  onSave = () => {
    const { uid, character } = this.props;
    const stateCharacter = this.state;

    if (!character) {
      notify.error('Персонаж не загружен!');
      return;
    }

    let changes = this.getChanges(initialCharacter, stateCharacter);
    if (changes.length === 0) {
      notify.error('В персонаже ничего не изменилось');
      return;
    }
    changes = this.getChanges(character || initialCharacter, stateCharacter);
    if (changes.length === 0) {
      notify.error('В персонаже ничего не изменилось');
      return;
    }

    if (stateCharacter.stats.skillPoints < 0) {
      notify.error('Очки Навыков (ОН) не могут быть отрицательными!');
      return;
    }

    notify.success('Персонаж сохранён');
    console.log(stateCharacter);
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


  render = () => {
    const { user, hasRight, currentUser, history, character } = this.props;

    if (!user || !character) {
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
      <Form
        initialValues={character}
        onValuesChange={this.onChange}
      >
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
              title="Применить изменения?"
              okText="Да"
              cancelText="Отмена"
              onConfirm={this.onSave}
            >
              <Button>Готово</Button>
            </Popconfirm>
          }
        >
          <div className="char-bio">
            <Input.TextArea
              // This Input is not a part of form in order to optimize changes a bit
              disabled={!hasRight}
              minLength={3}
              value={this.state.bio}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ bio: e.currentTarget.value })}
            />
          </div>
          <div>
            {this.getMainStats()}
          </div>
          <div>
            <div>
              {this.getSpecial()}
              {this.getStats()}
            </div>
            <div>
              {this.getSkills()}
            </div>
          </div>
        </Card>
      </Form>
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
