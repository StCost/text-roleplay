import React, {
  ChangeEvent,
  Component,
  KeyboardEvent,
} from 'react';
import { connect } from 'react-redux';
import { SendOutlined, DownOutlined } from '@ant-design/icons';
import {
  message as notify,
  Spin,
} from 'antd';

import '../../styles/chat.scss';
import actions from '../../reducers/actions';
import { IMessage, IState, IUser, IUsers } from '../../reducers/interfaces';
import Message from './Message';
import { validateMessage } from '../../helpers/utils';
import InputUpload from '../../components/InputUpload';

interface IChatProps {
  messages: IMessage[],
  uid: string,
  loading: boolean,
  users: IUsers;
  user: IUser;
}

interface IChatState {
  message: string;
  sending: boolean;
}

class Chat extends Component<IChatProps, IChatState> {
  state = {
    message: '',
    sending: false,
  };

  componentDidMount = () => {
    actions.getMessages({});
    actions.subscribe({});
    this.setState({ message: localStorage.getItem('message') || '' });
  };

  componentWillUnmount = () => {
    actions.unsubscribe({});
  };

  componentDidUpdate = (prevProps: IChatProps) => {
    const { messages, users } = this.props;

    if (this.state.sending && prevProps.messages !== messages) {
      localStorage.setItem('message', '');
      this.setState({
        message: '',
        sending: false,
      });
    }

    messages.forEach((m: IMessage) => {
      if (!users[m.author]) {
        actions.getUser({ uid: m.author });
      }
    });
  };

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
    const { user, loading, uid } = this.props;

    if (loading) {
      return;
    }

    if (!user) {
      notify.error('Данные о пользователе отсутствуют');
      return;
    }

    if (!user.nickname) {
      notify.error('Никнейм не установлен. Пройдите в настройки и назовите себя');
      return;
    }

    if (!user.approved) {
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
    if (event.currentTarget.scrollTop <= 50) {
      event.preventDefault();
      this.getMoreMessages();
    }
  };

  bodyRef: HTMLDivElement | null = null;
  render = () => {
    const { messages, loading, users, uid } = this.props;

    return (
      <Spin spinning={loading}>
        <div className="chat-wrapper">
          <div
            className="chat-body"
            ref={ref => this.bodyRef = ref}
            onScroll={this.onScroll}
          >
            {messages.map((m: IMessage) => (
              <Message
                key={m.time}
                message={m}
                user={users[m.author]}
                uid={uid}
              />
            ))}
          </div>
          <div className="chat-controls">
            <DownOutlined onClick={() => this.bodyRef && this.bodyRef.scrollTo({
              left: 0,
              top: Number.MAX_SAFE_INTEGER,
              behavior: 'smooth'
            })}/>
            <InputUpload
              textArea={true}
              placeholder="Введите сообщение"
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={this.onChangeMessage}
              onKeyDown={this.onKeyDown}
              value={this.state.message}
              onUpload={(message: string) => {
                this.changeMessage(`${this.state.message} ${message}`);
                actions.notify({ message: 'Файл успешно загружен!' });
              }}
            />
            <SendOutlined onClick={this.onSendMessage}/>
          </div>
        </div>
      </Spin>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { messages, uid, loading, users } = state;

  return {
    messages,
    uid,
    loading,
    users,
    user: users[uid]
  };
};

export default connect(mapStateToProps)(Chat);
