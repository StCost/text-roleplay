import { processMessages } from '../helpers/utils';
import { IRoll } from "../helpers/dice";

export interface IAction {
  type: string;

  [key: string]: any; // Payload could be any type or size
}

export interface IMessage {
  author: string;
  time: number;
  body: string;
  // Remove header and top margin of message, because author is the same
  grouped?: boolean;
  isCommand?: boolean;
  isRP?: boolean;
  commandResult?: string;
  mentioned?: boolean;
  rolls?: IRoll[];
}

export interface IUsers {
  [key: string]: IUser;
}

export interface IState {
  userData: IUser | null;
  isLoggedIn: boolean;
  settings: IUser | false;
  loading: boolean;
  messages: IMessage[];
  users: IUsers;
  uid: string;
  currentUser: IUser | null;
}

const user = JSON.parse(localStorage.getItem('user') || 'null');
if (user) localStorage.setItem('uid', user.uid);
export const initialState: IState = {
  userData: user,
  isLoggedIn: user !== null,
  settings: false,
  loading: false,
  messages: [],
  users: {},
  uid: user ? user.uid : '',
  currentUser: null,
};

export interface IUser {
  nickname: string;
  avatar: string;
  uid: string,
  lastOnline: number;
  isAdmin?: boolean;
}

export const defaultUser = {
  lastOnline: 0,

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
    case 'SET_USER':
    case 'UPLOAD_FILE': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'LOGIN_FAIL':
    case 'SET_USER_SUCCESS':
    case 'SET_USER_FAIL':
    case 'GET_MESSAGES_FAIL':
    case 'GET_MORE_MESSAGES_SUCCESS':
    case 'GET_MORE_MESSAGES_FAIL':
    case 'SEND_MESSAGE_FAIL': {
      return {
        ...state,
        loading: false,
      }
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        uid: action.user.uid,
        userData: action.user,
        isLoggedIn: action.user !== null,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        userData: null,
        isLoggedIn: false,
      }
    }
    case 'GET_MESSAGES_SUCCESS': {
      const messages = action.concat
        ? [...state.messages, ...action.messages]
        : action.messages;

      return {
        ...state,
        messages: processMessages(messages),
        loading: false,
      }
    }
    case 'GET_USER_SUCCESS': {
      return {
        ...state,
        currentUser: action.currentUser
          ? action.user
          : state.currentUser,
        users: {
          ...state.users,
          [action.uid]: action.user,
        },
      }
    }
    default:
      return state;
  }
};

export default reducer;
