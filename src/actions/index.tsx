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
  ...createAsyncAction('GET_USER'),
  ...createAsyncAction('GET_MESSAGES'),
  ...createAsyncAction('GET_MORE_MESSAGES'),
  ...createAsyncAction('SET_USER'),
  ...createAsyncAction('SEND_MESSAGE'),
  ...createAsyncAction('SUBSCRIBE'),
  ...createAsyncAction('UNSUBSCRIBE'),
  ...createAsyncAction('UPLOAD_FILE'),
  ...createAsyncAction('SET_ITEM'),
  ...createAsyncAction('GET_ITEMS'),
  ...createAsyncAction('GET_ITEMS_BY_ID'),
  ...createAsyncAction('GET_MORE_ITEMS'),
  updateLastOnline: createAction('UPDATE_LAST_ONLINE'),
  logout: createAction('LOGOUT'),
};

export default actions;
