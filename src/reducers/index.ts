import { User } from 'firebase';

export interface IAction {
  type: string;

  [key: string]: any; // Payload could be any type or size
}

export interface IMessage {
  author: string;
  time: string;
  body: string;
}

export interface IState {
  user: User | null;
  isLoggedIn: boolean;
  settings: ISettings | false;
  loading: boolean;
  messages: IMessage[];
  users: {[key: string]: ISettings}
}

const user = JSON.parse(localStorage.getItem('user') || 'null');
export const initialState: IState = {
  user,
  isLoggedIn: user !== null,
  settings: false,
  loading: false,
  messages: [],
  users: {},
};

export interface ISettings {
  nickname: string;
  avatar: string;
  uid: string,
}

export const defaultSettings = {
  nickname: '',
  avatar: '',
  uid: '',
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
    case 'GET_MESSAGES':
    case 'GET_MORE_MESSAGES':
    case 'SEND_MESSAGE':
    case 'GET_SETTINGS':
    case 'GET_USER':
    case 'SET_SETTINGS': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'LOGIN_FAIL':
    case 'GET_MESSAGES_FAIL':
    case 'GET_MORE_MESSAGES_SUCCESS':
    case 'GET_MORE_MESSAGES_FAIL':
    case 'SEND_MESSAGE_FAIL':
    case 'GET_SETTINGS_FAIL':
    case 'SET_SETTINGS_SUCCESS':
    case 'GET_USER_FAIL':
    case 'SET_SETTINGS_FAIL': {
      return {
        ...state,
        loading: false,
      }
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.user !== null,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      }
    }
    case 'GET_MESSAGES_SUCCESS': {
      const messages = action.concat
        ? [...state.messages, ...action.messages]
        : action.messages;

      return {
        ...state,
        messages: messages
          .sort((a: IMessage, b: IMessage) => parseInt(b.time) - parseInt(a.time))
          .filter((item: IMessage, pos: number, self: IMessage[]) =>
            self.findIndex((_i: IMessage) => _i.time === item.time) === pos
          ),
        loading: false,
      }
    }
    case 'GET_SETTINGS_SUCCESS': {
      return {
        ...state,
        settings: action.settings || defaultSettings,
        loading: false,
      }
    }
    case 'GET_USER_SUCCESS': {
      return {
        ...state,
        users: {
          ...state.users,
          [action.user.uid]: action.user,
        },
        loading: false,
      }
    }
    default:
      return state;
  }
};

export default reducer;
