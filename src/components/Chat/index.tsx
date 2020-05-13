import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { User } from 'firebase';
import { SendOutlined } from '@ant-design/icons';
import {
  Card,
  Input,
  message as notify,
  Button,
} from 'antd';

import './chat.scss';
import actions from '../../actions';
import { IMessage, ISettings, IState } from '../../reducers';

interface IChatProps {
  messages: IMessage[],
  user: User | null,
  settings: ISettings | false,
  loading: boolean,
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
    actions.subscribe({});
    this.setState({ message: localStorage.getItem('message') || '' });
  };

  componentWillUnmount = () => {
    actions.unsubscribe({});
  };

  componentDidUpdate = (prevProps: IChatProps) => {
    if (this.state.sending && prevProps.messages !== this.props.messages) {
      localStorage.setItem('message', '');
      this.setState({
        message: '',
        sending: false,
      });
    }
  };

  onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.target.value;
    localStorage.setItem('message', message);
    this.setState({ message });
  };

  onSendMessage = async () => {
    const { message } = this.state;
    const { settings, user, loading } = this.props;

    if (loading) {
      return;
    }

    if (!user || !settings) {
      notify.error('Not logged in. How are you even here? Contact administration');
      return;
    }

    if (!settings.displayName) {
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

  render = () => {
    const { messages, loading } = this.props;

    return (
      <div className="chat-wrapper">
        <div className="chat-body">
          {messages.map((m: IMessage) => (
            <Card
              className="chat-message"
              title={m.author}
              key={m.time}
              extra={this.getTime(m.time)}
            >
              {m.body}
            </Card>
          ))}
        </div>
        <div className="chat-controls">
          <Input.TextArea
            placeholder="Enter message"
            autoSize={{ minRows: 1, maxRows: 10 }}
            onChange={this.onChangeMessage}
            onPressEnter={this.onSendMessage}
            value={this.state.message}
            disabled={loading}
          />
          <SendOutlined
            onClick={this.onSendMessage}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { messages, user, settings, loading } = state;

  return {
    messages,
    user,
    settings,
    loading,
  };
};

export default connect(mapStateToProps)(Chat);
