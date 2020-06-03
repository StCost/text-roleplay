import { processMessages } from '../helpers/utils';
import {
  defaultDeletedItemData,
  defaultUser,
  IAction,
  IItem, IMessage,
  IState,
} from './interfaces';

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
  deletingItemData: defaultDeletedItemData,
  unreadMessage: false,
  characters: {},
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
    case 'GIVE_ITEM':
    case 'REMOVE_ITEM':
    case 'PASS_ITEM':
    case 'REGISTER':
    case 'RESET_PASSWORD':
    case 'SET_CHARACTER_NOTES':
    case 'GET_CHARACTER':
    case 'REMOVE_MESSAGE':
    case 'UPLOAD_FILE': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'SET_USER_SUCCESS':
    case 'GET_CHARACTER_FAIL':
    case 'SET_USER_FAIL':
    case 'GET_MESSAGES_FAIL':
    case 'GET_MORE_MESSAGES_SUCCESS':
    case 'GET_MORE_MESSAGES_FAIL':
    case 'GIVE_ITEM_SUCCESS':
    case 'REMOVE_ITEM_SUCCESS':
    case 'REMOVE_ITEM_FAIL':
    case 'PASS_ITEM_SUCCESS':
    case 'PASS_ITEM_FAIL':
    case 'DELETE_ITEM_FAIL':
    case 'RESET_PASSWORD_FAIL':
    case 'UPLOAD_FILE_SUCCESS':
    case 'UPLOAD_FILE_FAIL':
    case 'RESET_PASSWORD_SUCCESS':
    case 'GET_MORE_ITEMS_FAIL':
    case 'SET_CHARACTER_NOTES_FAIL':
    case 'SET_CHARACTER_NOTES_SUCCESS':
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
        currentUser: {
          ...defaultUser,
          uid: action.user.uid,
        },
        loading: false,
      }
    }
    case 'REGISTER_FAIL':
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
        ? [...action.messages, ...state.messages]
        : action.messages;

      return {
        ...state,
        messages: processMessages(messages),
        loading: false,
      }
    }
    case 'GET_USER_SUCCESS': {
      const { uid, user, updatedData } = action;

      const newUser = updatedData
        ? ({
          ...state.users[uid],
          ...updatedData,
        }) : (
          user
        );

      const currentUser = uid === state.uid
        ? newUser
        : state.currentUser;

      return {
        ...state,
        currentUser,
        users: {
          ...state.users,
          [action.uid]: newUser,
        },
      }
    }
    case 'GET_ITEMS_SUCCESS': {
      const items: { [key: string]: IItem } = {};
      [...state.items, ...action.items]
        .forEach((item: IItem) => items[item.id] = item);

      return {
        ...state,
        loading: false,
        items: Object.values(items),
      }
    }
    case 'NOTIFY': {
      return {
        ...state,
        notify: action.message,
      }
    }
    case 'NOTIFY_SUCCESS': {
      return {
        ...state,
        notify: undefined,
      }
    }
    case 'REDIRECT': {
      return {
        ...state,
        redirect: action.to,
      }
    }
    case 'REDIRECT_SUCCESS': {
      return {
        ...state,
        redirect: undefined,
      }
    }
    case 'DELETE_ITEM': {
      return {
        ...state,
        loading: true,
        deletingItemData: {
          itemId: action.id,
          defaultDeletedItemData,
        },
      }
    }
    case 'DELETE_ITEM_PROGRESS': {
      return {
        ...state,
        deletingItemData: {
          ...state.deletingItemData,
          [action.field]: action.value
        },
      }
    }
    case 'DELETE_ITEM_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: state.items.filter((item: IItem) => item.id !== action.id),
      }
    }
    case 'SET_UNREAD_MESSAGE': {
      return {
        ...state,
        unreadMessage: !!action.unreadMessage,
      }
    }
    case 'GET_ALL_USERS_SUCCESS': {
      return {
        ...state,
        users: action.users,
      }
    }
    case 'GET_CHARACTER_SUCCESS': {
      const { uid, character, updatedData } = action;

      const newCharacter = updatedData
        ? ({
          ...state.characters[uid],
          ...updatedData,
        }) : (
          character
        );

      return {
        ...state,
        loading: false,
        characters: {
          ...state.characters,
          [action.uid]: newCharacter,
        },
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.error,
      }
    }
    case 'REMOVE_MESSAGE_SUCCESS': {
      return {
        ...state,
        loading: false,
        messages: state.messages.filter((m: IMessage) => m.time !== parseInt(action.id)),
      }
    }
    default:
      return state;
  }
};

export default reducer;
