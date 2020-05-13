import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { User } from 'firebase';
import { SendOutlined } from '@ant-design/icons';
import {
  Card,
  Input,
  message as notify,
} from 'antd';

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
    this.setState({ message: localStorage.getItem('message') || ''});
    actions.getMessages({});
  };

  onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    localStorage.setItem('message', message);
    this.setState({ message });
  };

  componentDidUpdate = (prevProps: IChatProps) => {
    if (prevProps.loading && !this.props.loading && this.state.sending) {
      localStorage.setItem('message', '');
      this.setState({
        message: '',
        sending: false,
      });
    }
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

  render = () => {
    const { messages, loading } = this.props;

    return (
      <Card>
        {messages.map((m: IMessage) => (
          <Card
            title={m.author}
            key={m.time}
          >
            {m.body}
          </Card>
        ))}
        <div>
          <Input
            placeholder="Enter message"
            onChange={this.onChangeMessage}
            onPressEnter={this.onSendMessage}
            value={this.state.message}
            disabled={loading}
          />
          <SendOutlined
            onClick={this.onSendMessage}
          />
        </div>
      </Card>
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
