import { User } from 'firebase';

export interface IAction {
  type: string;
  [key: string]: any; // Payload could be any type or size
}

export interface ISettingItem {
    label: string;
    type: 'select' | 'string' | 'image';
    value: string;
    options: { [key: string]: string | number }
}

export interface ISettings {
  [key: string]: ISettingItem;
}

export interface IState {
  user: User | null;
  isLoggedIn: boolean;
  settings: ISettings | false;
  loading: boolean;
}

export const initialState: IState = {
  user: null,
  isLoggedIn: false,
  settings: false,
  loading: false,
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
    case 'GET_DASHBOARD':
    case 'GET_SETTINGS': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'LOGIN_FAIL':
    case 'GET_DASHBOARD_FAIL':
    case 'GET_SETTINGS_FAIL': {
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
    case 'GET_DASHBOARD_SUCCESS': {
      return {
        ...state,
        dashboard: action.dashboard,
        loading: false,
      }
    }
    case 'GET_SETTINGS_SUCCESS': {
      return {
        ...state,
        settings: action.settings,
        loading: false,
      }
    }
    default:
      return state;
  }
};

export default reducer;
