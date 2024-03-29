import React, {
    ChangeEvent,
    Component,
    KeyboardEvent,
} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
    SendOutlined,
    FileImageOutlined,
    DownOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    ReloadOutlined,
    SyncOutlined,
    CodeOutlined,
    PhoneOutlined,
    FieldTimeOutlined,
    EditOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import {
    Dropdown,
    message as notify,
    Menu,
    Button,
    Card,
    Tooltip,
} from 'antd';
import {RouteComponentProps, withRouter} from 'react-router';

import '../../styles/chat.scss';

import actions from '../../reducers/actions';
import {IMessage, IState, IUser, IUsers} from '../../reducers/interfaces';

import InputUpload from '../../components/InputUpload';
import TypingUsersList from '../../components/TypingUsersList';
import Message from './Message';

import {getUserStatus, validateMessage} from '../../helpers/utils';
import {addStatusChangeListener, removeStatusChangeListener} from '../../helpers/activity';

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

        addStatusChangeListener('afk', this.resetIsTyping);
        addStatusChangeListener('offline', this.resetIsTyping);
    };

    componentWillUnmount() {
        removeStatusChangeListener('afk', this.resetIsTyping);
        removeStatusChangeListener('offline', this.resetIsTyping);
    }

    quickDisplayActiveUsers = () => {
        return <div className="active-users-list">
            {[...Object.values(this.props.users)]
            .filter((user) => getUserStatus(user) !== 'offline')
            .map((user) => (
                <div
                    className={`active-user ${getUserStatus(user)}`}
                    key={user.uid}
                    onClick={() => this.props.history.push(`/${user.uid}/notes`)}
                >{user.nickname}</div>
            ))}
        </div>
    }

    componentDidUpdate = (prevProps: IChatProps, prevState: IChatState) => {
        const {messages, users, loading} = this.props;

        if (this.state.sending && prevProps.messages.length <= messages.length) {
            const lastIsRp = this.state.message.substring(0, 1) == '*';
            const newMessage = lastIsRp ? '*' : '';
            localStorage.setItem('message', newMessage);
            this.setState({
                message: newMessage,
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
                    actions.getUser({uid: notLoadedUser});

                const emptyUser = uniqueUsers.find((uid: string) => !!users[uid] && !!users[uid].error);
                if (emptyUser)
                    messages.forEach(({author, time}) => {
                        author === emptyUser &&
                        actions.removeMessage({id: time});
                    });
            }
        }

        if (prevState !== this.state) {
            localStorage.setItem('chat-state', JSON.stringify(this.state));
        }
    };

    togglePinned = (showPinned = !this.state.showPinned) =>
        this.setState({showPinned});

    onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) =>
        this.changeMessage(event.target.value);

    changeMessage = (message: string) => {
        localStorage.setItem('message', message);
        this.setState({message});
    };

    lastTyping = Date.now() - 500;
    timeout: NodeJS.Timeout | null = null;
    onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            this.onSendMessage(event.getModifierState("Alt") ? 'complete' : 'none')();
        } else {
            const time = Date.now();
            if (this.props.currentUser && time > this.lastTyping) {
                if (!this.props.currentUser.isTyping) {
                    actions.setIsTyping({isTyping: true, uid: this.props.uid});
                }
                this.timeout !== null && clearTimeout(this.timeout);

                this.lastTyping = time + 1000;
                this.timeout = setTimeout(() => {
                    if (Date.now() > this.lastTyping) {
                        actions.setIsTyping({isTyping: false, uid: this.props.uid});
                    }
                }, 3000);
            }
        }

        // If you press Up - repeat your last message
        // const { uid } = this.props;
        // if (event.key === 'Up' || event.key === 'ArrowUp') {
        //   const message = this.props.messages.find((m: IMessage) => m.author === uid);
        //   if (message) {
        //     const { currentTarget: { value, selectionStart } } = event;
        //     if (value.substr(0, selectionStart).split('\n').length === 1) {
        //       const { body } = message;
        //       localStorage.setItem('message', body);
        //       this.setState({ message: body });
        //     }
        //   }
        // }
    };

    resetIsTyping = () => {
        const {uid, currentUser} = this.props;
        if (currentUser?.isTyping)
            actions.setIsTyping({isTyping: false, uid});
    }

    onSendMessage = (aiComplete: 'none' | 'complete' | 'picture') => () => {
        const {message} = this.state;
        const {currentUser, loading, uid} = this.props;

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

        this.setState({sending: true});
        switch (aiComplete) {
            case 'picture':
                actions.sendMessagePhotoAi({
                    message,
                    uid,
                    setMessageInsteadCallback: this.changeMessage
                });
                break;

            case 'complete':
                actions.sendMessageAi({
                    message: '\n' + message,
                    uid,
                    setMessageInsteadCallback: this.changeMessage
                });
                break;

            case 'none':
            default:
                actions.sendMessage({
                    uid,
                    message,
                });
                break;
        }
    };

    getMoreMessages = () => {
        actions.getMoreMessages({firstMessage: this.props.messages[this.props.messages.length - 1]})
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
        actions.notify({message: `Сообщение ${message.pinned ? 'откреплено' : 'прикреплено'}!`});
    };

    getPinnedMessage = (messages: IMessage[]) => {
        const pinnedMessage = messages.find((message: IMessage) => message.pinned);
        if (!pinnedMessage) return false;

        const {showPinned} = this.state;
        return (
            <div className={`chat-pinned-message ${showPinned ? '' : 'hidden'}`}>
                {showPinned
                    ? <EyeOutlined onClick={() => this.togglePinned()}/>
                    : <EyeInvisibleOutlined onClick={() => this.togglePinned()}/>
                }
                {this.getMessage({...pinnedMessage, grouped: false})}
            </div>
        )
    };

    getMessageControlsOverlay = (m: IMessage) => {
        const {currentUser} = this.props;

        const isAdmin = currentUser?.isAdmin;
        const canDelete = isAdmin || currentUser?.uid === m.author;

        const onDelete = (e: React.MouseEvent) => // instant delete
            actions.removeMessage({id: m.time});

        // const onDelete = (e: React.MouseEvent) => // confirm delete
        //     e.shiftKey
        //         ? actions.removeMessage({id: m.time})
        //         : Modal.confirm({
        //             title: 'Удалить?',
        //             content: 'Вы уверены, что хотите удалить сообщение? Это действите нельзя будет отменить',
        //             okText: 'Удалить',
        //             cancelText: 'Отмена',
        //             onOk: (close) => {
        //                 actions.removeMessage({id: m.time});
        //                 close();
        //             },
        //         });

        return (
            <Menu>
                <Menu.Item>
                    <Card bodyStyle={{padding: '4px 15px'}}>
                        {moment(m.time).format('HH:MM:SS DD:MM:YYYY')}
                    </Card>
                </Menu.Item>
                {isAdmin && <Menu.Item>
                    <Button onClick={this.onPinMessage(m)}>
                        {m.pinned
                            ? 'Открепить'
                            : 'Прикрепить'
                        }
                    </Button>
                </Menu.Item>}
                {canDelete && <Menu.Item>
                    <Button onClick={onDelete}>Удалить</Button>
                </Menu.Item>}
            </Menu>
        )
    };

    getMessageControls = (m: IMessage) => {
        return (
            <Dropdown
                overlay={this.getMessageControlsOverlay(m)}
                trigger={['hover']}
                placement="topLeft"
            >
                <div className="chat-time">
                    <FieldTimeOutlined />
                    {' '}
                    {moment(m.time).fromNow(true)}
                </div>
            </Dropdown>
        )
    };

    getMessage = (m: IMessage) => {
        const {users, uid, history} = this.props;

        return (
            <Message
                key={m.time}
                message={m}
                user={users[m.author]}
                uid={uid}
                extra={this.getMessageControls(m)}
                onUserClick={() => history.push(`/${m.author}/notes`)}
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
        const {messages, loading, currentUser} = this.props;

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
                    {this.quickDisplayActiveUsers()}
                    <DownOutlined onClick={this.scrollDown}/>
                    <TypingUsersList/>
                    <InputUpload
                        textArea={true}
                        placeholder="Введите сообщение"
                        autoSize={{minRows: 1, maxRows: 10}}
                        onChange={this.onChangeMessage}
                        onKeyDown={this.onKeyDown}
                        value={this.state.message}
                        disabled={!currentUser || !currentUser.enableDisabledFeatures}
                        onUpload={(message: string) => {
                            this.changeMessage(`${this.state.message} ${message}`);
                            actions.notify({message: 'Файл успешно загружен!'});
                        }}
                    />
                    <div className="ai-buttons">
                        {/* call GM mode */}
                        <PhoneOutlined onClick={() => actions.sendMessageAi({IC: true, OOC: true})}/>
                        <div>call_AI</div>
                        <br/>
                        {/* Complete user text */}
                        <EditOutlined  onClick={this.onSendMessage('complete')}/>
                        <div>write</div>
                        <br/>
                        {/* Generate image from text*/}
                        <VideoCameraAddOutlined onClick={this.onSendMessage('picture')}/>
                        <div>image</div>
                    </div>
                    <SendOutlined onClick={this.onSendMessage('none')}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    const {messages, uid, loading, users, currentUser} = state;

    return {
        messages,
        uid,
        loading,
        users,
        currentUser,
    };
};

export default withRouter(connect(mapStateToProps)(Chat));
