import { processMessages } from '../helpers/utils';
import { IAction, IItem, IState } from "./interfaces";

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
  items: [],
  error: false,
};

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
    case 'GET_ITEMS':
    case 'GET_MORE_ITEMS':
    case 'GET_ITEMS_BY_ID':
    case 'CREATE_ITEM':
    case 'DELETE_ITEM':
    case 'GIVE_ITEM':
    case 'REMOVE_ITEM':
    case 'PASS_ITEM':
    case 'UPLOAD_FILE': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'SET_USER_SUCCESS':
    case 'SET_USER_FAIL':
    case 'GET_MESSAGES_FAIL':
    case 'GET_MORE_MESSAGES_SUCCESS':
    case 'GET_MORE_MESSAGES_FAIL':
    case 'GIVE_ITEM_SUCCESS':
    case 'REMOVE_ITEM_SUCCESS':
    case 'REMOVE_ITEM_FAIL':
    case 'PASS_ITEM_SUCCESS':
    case 'PASS_ITEM_FAIL':
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
    case 'LOGIN_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.error,
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
    case 'GET_ITEMS_SUCCESS': {
      const items: {[key: string]: IItem} = {};
      [...state.items, ...action.items]
        .forEach((item: IItem) => items[item.id] = item);

      return {
        ...state,
        loading: false,
        items: Object.values(items),
      }
    }
    case 'DELETE_ITEM_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: state.items.filter((item: IItem) => item.id !== action.id),
      }
    }
    default:
      return state;
  }
};

export default reducer;
