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
  ...createAsyncAction('GET_MESSAGES'),
  ...createAsyncAction('GET_MORE_MESSAGES'),
  ...createAsyncAction('GET_SETTINGS'),
  ...createAsyncAction('SET_SETTINGS'),
  ...createAsyncAction('SEND_MESSAGE'),
  ...createAsyncAction('SUBSCRIBE'),
  ...createAsyncAction('UNSUBSCRIBE'),
  logout: createAction('LOGOUT'),
};

export default actions;
