import React, { ChangeEvent, Component, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { User } from 'firebase';
import { SendOutlined } from '@ant-design/icons';
import {
  Card,
  Input,
  message as notify,
  Spin,
} from 'antd';

import './chat.scss';
import actions from '../../actions';
import { IMessage, ISettings, IState, IUsers } from '../../reducers';
import Message from './Message';

interface IChatProps {
  messages: IMessage[],
  user: User | null,
  settings: ISettings | false,
  loading: boolean,
  users: IUsers;
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

  onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.target.value;
    localStorage.setItem('message', message);
    this.setState({ message });
  };

  onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      this.onSendMessage();
    }
  };

  onSendMessage = () => {
    const { message } = this.state;
    const { settings, user, loading } = this.props;

    if (loading) {
      return;
    }

    if (!user || !settings) {
      notify.error('Not logged in. How are you even here? Contact administration');
      return;
    }

    if (!settings.nickname) {
      notify.error('User name is not defined. Go to settings and set it');
      return;
    }

    if (!message) {
      notify.error('Message is empty');
      return;
    }

    this.setState({ sending: true });
    actions.sendMessage({
      uid: user.uid,
      message,
    });
  };

  getTime = (time: string) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  };

  getMoreMessages = () => {
    actions.getMoreMessages({ firstMessage: this.props.messages[this.props.messages.length - 1] })
  };

  onScroll = (event: any) => {
    if (event.target.scrollTop <= 50) {
      this.getMoreMessages();
    }
  };

  render = () => {
    const { messages, loading, users } = this.props;

    return (
      <Spin spinning={loading}>
        <div className={`chat-wrapper`}>
          <div
            className="chat-body"
            onScroll={this.onScroll}
          >
            {messages.map((m: IMessage) => (
              <Message
                key={m.time}
                message={m}
                user={users[m.author]}
              />
            ))}
          </div>
          <div className="chat-controls">
            <Input.TextArea
              placeholder="Enter message"
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={this.onChangeMessage}
              onKeyDown={this.onKeyDown}
              value={this.state.message}
            />
            <SendOutlined
              onClick={this.onSendMessage}
            />
          </div>
        </div>
      </Spin>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { messages, user, settings, loading, users, } = state;

  return {
    messages,
    user,
    settings,
    loading,
    users,
  };
};

export default connect(mapStateToProps)(Chat);