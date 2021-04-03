import store from '../helpers/store';
import { camelize } from '../helpers/utils';

const dispatch = store.dispatch;

export interface IPayload {
  [key: string]: any;
}

interface IActions {
  [key: string]: (payload: IPayload) => void;
}

const createAction =
  (type: string) =>
    (payload?: IPayload) =>
      dispatch({ type, ...payload });

const createAsyncAction = (type: string) => {
  const typeName = camelize(type);
  return {
    [typeName]: createAction(type),
    [`${typeName}Success`]: createAction(`${type}_SUCCESS`),
    [`${typeName}Fail`]: createAction(`${type}_FAIL`),
  }
};

const actions: IActions = {
  ...createAsyncAction('LOGIN'),
  ...createAsyncAction('REGISTER'),
  ...createAsyncAction('RESET_PASSWORD'),
  ...createAsyncAction('GET_USER'),
  ...createAsyncAction('GET_MESSAGES'),
  ...createAsyncAction('GET_MORE_MESSAGES'),
  ...createAsyncAction('SET_USER'),
  ...createAsyncAction('SEND_MESSAGE'),
  ...createAsyncAction('CHANGE_MESSAGE'),
  ...createAsyncAction('SUBSCRIBE'),
  ...createAsyncAction('UNSUBSCRIBE'),
  ...createAsyncAction('UPLOAD_FILE'),
  ...createAsyncAction('SET_ITEM'),
  ...createAsyncAction('DELETE_ITEM'),
  ...createAsyncAction('GET_ITEMS'),
  ...createAsyncAction('GET_ITEM_BY_ID'),
  ...createAsyncAction('GET_MORE_ITEMS'),
  ...createAsyncAction('GIVE_ITEM'),
  ...createAsyncAction('REMOVE_ITEM'),
  ...createAsyncAction('PASS_ITEM'),
  ...createAsyncAction('TAKE_ITEM'),
  ...createAsyncAction('NOTIFY'),
  ...createAsyncAction('REDIRECT'),
  ...createAsyncAction('DELETE_ITEM'),
  ...createAsyncAction('SET_USER_STATUS'),
  ...createAsyncAction('GET_CHARACTER'),
  ...createAsyncAction('SET_CHARACTER'),
  ...createAsyncAction('GET_ALL_USERS'),
  ...createAsyncAction('FULL_DELETE_USER'),
  ...createAsyncAction('SET_CHARACTER_NOTES'),
  ...createAsyncAction('REMOVE_MESSAGE'),
  ...createAsyncAction('SET_IS_TYPING'),
  setUnreadMessage: createAction('SET_UNREAD_MESSAGE'),
  deleteItemProgress: createAction('DELETE_ITEM_PROGRESS'),
  updateLastOnline: createAction('UPDATE_LAST_ONLINE'),
  logout: createAction('LOGOUT'),
  setError: createAction('SET_ERROR'),
};

export default actions;
