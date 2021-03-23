import React, {
  ChangeEvent,
  Component,
  KeyboardEvent,
} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  SendOutlined,
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ReloadOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  Dropdown,
  message as notify,
  Menu,
  Button,
  Modal,
} from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';

import '../../styles/chat.scss';
import actions from '../../reducers/actions';
import { IMessage, IState, IUser, IUsers } from '../../reducers/interfaces';
import Message from './Message';
import { validateMessage } from '../../helpers/utils';
import InputUpload from '../../components/InputUpload';

interface IChatProps extends RouteComponentProps {
  messages: IMessage[],
  uid: string,
  loading: boolean,
  users: IUsers;
  currentUser: IUser | null;
}

interface IChatState {
  message: string;
  sending: boolean;
  showPinned: boolean;
}

class Chat extends Component<IChatProps, IChatState> {
  state = {
    message: '',
    sending: false,
    showPinned: true,
  };

  componentDidMount = () => {
    actions.subscribe({});
    this.setState(JSON.parse(localStorage.getItem('chat-state') || '{}'));
  };

  componentDidUpdate = (prevProps: IChatProps, prevState: IChatState) => {
    const { messages, users, loading } = this.props;

    if (this.state.sending && prevProps.messages !== messages) {
      localStorage.setItem('message', '');
      this.setState({
        message: '',
        sending: false,
      });
    }

    if (!loading) {
      const uniqueUsers = messages
        .map((m: IMessage) => m.author)
        .filter((item: string, pos: number, self: string[]) =>
          self.findIndex((_i: string) => _i === item) === pos
        );

      if (uniqueUsers.length !== Object.keys(users).length) {
        const notLoadedUser = uniqueUsers.find((uid: string) => !users[uid]);
        if (notLoadedUser)
          actions.getUser({ uid: notLoadedUser });

        const emptyUser = uniqueUsers.find((uid: string) => !!users[uid] && !!users[uid].error);
        if (emptyUser)
          messages.forEach(({ author, time }) => {
            author === emptyUser &&
            actions.removeMessage({ id: time });
          });
      }
    }

    if (prevState !== this.state) {
      localStorage.setItem('chat-state', JSON.stringify(this.state));
    }
  };

  togglePinned = (showPinned = !this.state.showPinned) =>
    this.setState({ showPinned });

  onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) =>
    this.changeMessage(event.target.value);

  changeMessage = (message: string) => {
    localStorage.setItem('message', message);
    this.setState({ message });
  };

  onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      this.onSendMessage();
    }

    const { uid } = this.props;
    if (event.key === 'Up' || event.key === 'ArrowUp') {
      const message = this.props.messages.find((m: IMessage) => m.author === uid);
      if (message) {
        const { currentTarget: { value, selectionStart } } = event;
        if (value.substr(0, selectionStart).split('\n').length === 1) {
          const { body } = message;
          localStorage.setItem('message', body);
          this.setState({ message: body });
        }
      }
    }
  };

  onSendMessage = () => {
    const { message } = this.state;
    const { currentUser, loading, uid } = this.props;

    if (loading) {
      return;
    }

    if (!currentUser) {
      notify.error('Данные о пользователе отсутствуют');
      return;
    }

    if (!currentUser.nickname) {
      notify.error('Никнейм не установлен. Пройдите в настройки и назовите себя');
      return;
    }

    if (!currentUser.approved) {
      notify.error('Админ пока что не активировал Ваш аккаунт');
      return;
    }

    if (!validateMessage(message)) {
      return;
    }

    this.setState({ sending: true });
    actions.sendMessage({
      uid,
      message,
    });
  };

  getMoreMessages = () => {
    actions.getMoreMessages({ firstMessage: this.props.messages[this.props.messages.length - 1] })
  };

  onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (event.currentTarget.scrollHeight + event.currentTarget.scrollTop <= 1000) {
      event.preventDefault();
      this.getMoreMessages();
    }
  };

  onPinMessage = (message: IMessage) => () => {
    actions.changeMessage({
      message: {
        ...message,
        pinned: !message.pinned,
      }
    });
    actions.notify({ message: `Сообщение ${message.pinned ? 'откреплено' : 'прикреплено'}!` });
  };

  getPinnedMessage = (messages: IMessage[]) => {
    const pinnedMessage = messages.find((message: IMessage) => message.pinned);
    if (!pinnedMessage) return false;

    const { showPinned } = this.state;
    return (
      <div className={`chat-pinned-message ${showPinned ? '' : 'hidden'}`}>
        {showPinned
          ? <EyeOutlined onClick={() => this.togglePinned()}/>
          : <EyeInvisibleOutlined onClick={() => this.togglePinned()}/>
        }
        {this.getMessage({ ...pinnedMessage, grouped: false })}
      </div>
    )
  };

  getMessageControlsOverlay = (m: IMessage) => {
    const onDelete = () =>
      Modal.confirm({
        title: 'Удалить?',
        content: 'Вы уверены, что хотите удалить сообщение? Это действите нельзя будет отменить',
        okText: 'Удалить',
        cancelText: 'Отмена',
        onOk: (close) => {
          actions.removeMessage({ id: m.time });
          close();
        },
      });

    return (
      <Menu>
        <Menu.Item>
          <Button onClick={this.onPinMessage(m)}>
            {m.pinned
              ? 'Открепить'
              : 'Прикрепить'
            }
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={onDelete}>Удалить</Button>
        </Menu.Item>
      </Menu>
    )
  };

  getMessageControls = (m: IMessage) => {
    const { currentUser } = this.props;
    if (!currentUser || !currentUser.isAdmin) return;

    return (
      <Dropdown
        overlay={this.getMessageControlsOverlay(m)}
        trigger={['click']}
      >
        <div className="chat-time">{moment(m.time).fromNow()}</div>
      </Dropdown>
    )
  };

  getMessage = (m: IMessage) => {
    const { users, uid, history } = this.props;

    return (
      <Message
        key={m.time}
        message={m}
        user={users[m.author]}
        uid={uid}
        extra={this.getMessageControls(m)}
        onUserClick={() => history.push(`/${m.author}/stats`)}
      />
    );
  };

  scrollDown = () =>
    this.bodyRef && this.bodyRef.scrollTo({
      left: 0,
      top: Number.MAX_SAFE_INTEGER,
      behavior: 'smooth'
    });

  bodyRef: HTMLDivElement | null = null;
  render = () => {
    const { messages, loading, currentUser } = this.props;

    return (
      <div className="chat-wrapper">
        <div className="chat-reload">
          {loading
            ? <SyncOutlined spin/>
            : <ReloadOutlined onClick={() => actions.getMessages({})}/>
          }
        </div>
        {this.getPinnedMessage(messages)}
        <div
          className="chat-body"
          ref={ref => this.bodyRef = ref}
          onScroll={this.onScroll}
        >
          {messages.map(this.getMessage)}
        </div>
        <div className="chat-controls">
          <DownOutlined onClick={this.scrollDown}/>
          <InputUpload
            textArea={true}
            placeholder="Введите сообщение"
            autoSize={{ minRows: 1, maxRows: 10 }}
            onChange={this.onChangeMessage}
            onKeyDown={this.onKeyDown}
            value={this.state.message}
            disabled={!currentUser || !currentUser.enableDisabledFeatures}
            onUpload={(message: string) => {
              this.changeMessage(`${this.state.message} ${message}`);
              actions.notify({ message: 'Файл успешно загружен!' });
            }}
          />
          <SendOutlined onClick={this.onSendMessage}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { messages, uid, loading, users, currentUser } = state;

  return {
    messages,
    uid,
    loading,
    users,
    currentUser,
  };
};

export default withRouter(connect(mapStateToProps)(Chat));
