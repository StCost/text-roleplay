import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Input, Card, Switch, Empty } from 'antd';
import { BookOutlined } from '@ant-design/icons';

import '../styles/notebook.scss';
import {formatMessage, getStateUser, redirectToUserPage} from '../helpers/utils';
import { ICharacter } from '../containers/Character/config';
import { IUser } from '../reducers/interfaces';
import actions from '../reducers/actions';
import MessageBody from "../containers/Chat/MessageBody";

interface INotebookProps extends RouteComponentProps {
  character: ICharacter;
  user: IUser | null;
  uid: string;
  currentUser: IUser | null;
  hasRight: boolean;
}

class Notebook extends Component<INotebookProps, { notes?: string, editMode?: boolean }> {
  state = { notes: undefined, editMode: false };

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

      this.setState({ editMode: false })
  };

  componentWillUnmount = this.onSave;

  getTitle = (user: IUser) => (
    <>
      <BookOutlined/>
      {' '}
      Записи пользователя {user.nickname}
    </>
  );

  render = () => {
    const {
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
          title={this.getTitle(user)}
        >
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
          {this.state.editMode ? (
          <Input.TextArea
            className="notebook-input"
            value={this.state.notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ notes: e.currentTarget.value })}
            onBlur={this.onSave}
            readOnly={!hasRight}
            autoFocus
            autoSize
          />
          ) : (
            <pre onClick={() => this.setState({ editMode: true })}>
                <MessageBody message={({ body: this.state.notes || '', author: user.uid, time: 0 })}/>
            </pre>
          )}
        </Card>
      ) : (
        <Empty description="Пользователь скрыл свои записи от посторонних"/>
      );
  }
}

export default withRouter(connect(getStateUser)(Notebook));
