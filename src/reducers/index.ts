import { User } from 'firebase';

export interface IAction {
  type: string;

  [key: string]: any; // Payload could be any type or size
}

export interface ISettings {
  displayName: string;
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
}

const user = JSON.parse(localStorage.getItem('user') || 'null');
export const initialState: IState = {
  user,
  isLoggedIn: user !== null,
  settings: false,
  loading: false,
  messages: [],
};

const defaultSettings = {
  displayName: '',
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
    case 'GET_MESSAGES':
    case 'SEND_MESSAGE':
    case 'GET_SETTINGS':
    case 'SET_SETTINGS': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'LOGIN_FAIL':
    case 'GET_MESSAGES_FAIL':
    case 'SEND_MESSAGE_FAIL':
    case 'SEND_MESSAGE_SUCCESS':
    case 'GET_SETTINGS_FAIL':
    case 'SET_SETTINGS_SUCCESS':
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
      return {
        ...state,
        messages: action.messages,
        loading: false,
      }
    }
    case 'GET_SETTINGS_SUCCESS': {
      console.log(action);
      return {
        ...state,
        settings: action.settings || defaultSettings,
        loading: false,
      }
    }
    default:
      return state;
  }
};

export default reducer;
