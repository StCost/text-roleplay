import store from '../helpers/store';
import { camelize } from '../helpers/utils';

const dispatch = store.dispatch;

interface IPayload {
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
  ...createAsyncAction('GET_DASHBOARD'),
  ...createAsyncAction('GET_SETTINGS'),
  logout: createAction('LOGOUT'),
};

export default actions;
