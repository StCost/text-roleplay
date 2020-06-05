import React, { ChangeEvent, Component, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  Card,
  Input,
  Button,
  message as notify,
} from 'antd';
import { SendOutlined, UpOutlined, TrophyOutlined } from '@ant-design/icons';
import { Store } from 'rc-field-form/lib/interface';

import '../../styles/perks.scss';
import PerkItem from './PerkItem';
import { getStateUser, redirectToUserPage } from '../../helpers/utils';
import actions from '../../reducers/actions';
import { IPerk, IState, IUser } from '../../reducers/interfaces';
import { ICharacter } from '../Character/config';

interface IPerksProps extends RouteComponentProps {
  character: ICharacter;
  user: IUser | null;
  hasRight: boolean;
  uid: string;
  currentUser: IUser | null;
}

interface IPerksState {
  label: string;
  description: string;
}

class Index extends Component<IPerksProps, IPerksState> {
  state = {
    label: '',
    description: '',
  };

  componentDidMount = () => {
    const { character, uid, user, currentUser, history } = this.props;
    if (!character) {
      actions.getCharacter({ uid });
    }
    redirectToUserPage(user, currentUser, history);
  };

  componentDidUpdate = () => {
    const { user, currentUser, history } = this.props;
    redirectToUserPage(user, currentUser, history);
  };

  scrollUp = () =>
    this.bodyRef && this.bodyRef.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });

  onSend = () => {
    const { uid, character } = this.props;
    const { description, label } = this.state;

    if (!character) return;
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

    const newCharacter: ICharacter = {
      ...character,
      perks: [
        ...(character.perks || []),
        perk,
      ],
    };

    actions.setCharacter({ uid, character: newCharacter });
    actions.sendMessage({
      uid,
      message: '*получил перк',
      data: { perk },
    });
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

  onDelete = (perk: IPerk) => {
    const { uid, character } = this.props;
    if (!character) return;

    const newCharacter: ICharacter = {
      ...character,
      perks: character.perks.filter((p: IPerk) => perk.id !== p.id),
    };

    actions.setCharacter({ uid, character: newCharacter });
    actions.sendMessage({
      uid,
      message: '*потерял перк',
      data: { perk },
    });
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
    const { character, user, hasRight } = this.props;
    const { label, description } = this.state;

    if (!user || !character) return false;

    return (
      <Card
        className="perks"
        title={(
          <>
            <TrophyOutlined/>
            {' '}
            Перки персонажа {user.nickname}
          </>
        )}
      >
        <div
          className="perks-body"
          ref={ref => this.bodyRef = ref}
        >
          {(character.perks || []).map((perk: IPerk) =>
            <PerkItem
              key={perk.id}
              perk={perk}
              onDelete={this.onDelete}
              hasRight={hasRight}
            />
          )}
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
      </Card>
    )
  }
}

const mapStateToProps = (state: IState, props: RouteComponentProps) => {
  const charState = getStateUser(state, props);
  const { user, currentUser, character } = charState;
  const newHasRight = (!!user && !!currentUser) && currentUser.approved && ((currentUser.uid === user.uid && (character && !character.static)) || currentUser.isAdmin);

  return {
    ...charState,
    hasRight: newHasRight,
  }
};

export default withRouter(connect(mapStateToProps)(Index));
