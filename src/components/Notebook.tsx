import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Input, Card, Switch, Empty } from 'antd';
import { BookOutlined } from '@ant-design/icons';

import '../styles/notebook.scss';
import { getStateUser, redirectToUserPage } from '../helpers/utils';
import { ICharacter } from '../containers/Character/config';
import { IUser } from '../reducers/interfaces';
import actions from '../reducers/actions';
import Loader from './Loader';

interface INotebookProps extends RouteComponentProps {
  character: ICharacter;
  user: IUser | null;
  uid: string;
  currentUser: IUser | null;
  loading: boolean;
  hasRight: boolean;
}

class Notebook extends Component<INotebookProps, { notes?: string }> {
  state = { notes: undefined };

  componentDidMount = () => {
    const { character, user, uid, currentUser, history } = this.props;
    if (!character)
      actions.getCharacter({ uid });
    else
      this.setState({ notes: character.notes });

    if (!user)
      actions.getUser({ uid });
    redirectToUserPage(user, currentUser, history);
  };

  componentDidUpdate = (prevProps: INotebookProps) => {
    const { character, user, currentUser, history } = this.props;
    if (prevProps !== this.props && character && character.notes !== this.state.notes)
      this.setState({ notes: character.notes });
    redirectToUserPage(user, currentUser, history);
  };

  onSave = () => {
    const { uid } = this.props;
    const { notes } = this.state;

    if (uid && notes !== undefined)
      actions.setCharacterNotes({ uid, notes });
  };

  componentWillUnmount = this.onSave;

  render = () => {
    const {
      loading,
      user,
      currentUser,
      hasRight,
      character,
      uid,
    } = this.props;

    if (!user || !character) {
      return (
        <Empty description="Данные не загружены"/>
      )
    }

    const notesAreVisible = user.notesAreVisible;
    return (notesAreVisible || (currentUser && (currentUser.isAdmin || currentUser.uid === uid)))
      ? (
        <Card
          className="notebook"
          title={(
            <>
              <BookOutlined/>
              {' '}
              Записи пользователя {user.nickname}
            </>
          )}
        >
          <Loader loading={loading}/>
          <div className="notebook-switch">
            <Switch
              checked={notesAreVisible}
              onChange={() => actions.setUser({ uid, user: { ...user, notesAreVisible: !notesAreVisible } })}
              disabled={!hasRight}
            />
            <span>
            {notesAreVisible
              ? 'Записи видны всем'
              : 'Записи видны только Вам'
            }
          </span>
          </div>
          <Input.TextArea
            className="notebook-input"
            value={this.state.notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ notes: e.currentTarget.value })}
            onBlur={this.onSave}
            readOnly={!hasRight}
          />
        </Card>
      ) : (
        <Empty description="Пользователь скрыл свои записи от посторонних"/>
      );
  }
}

export default withRouter(connect(getStateUser)(Notebook));
