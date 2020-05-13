import { IState } from '../reducers/index';

export const camelize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_./g, (m) => m.toUpperCase())
    .replace(/_/g, '')
};

export const mapLoggedToProps = (state: IState) => {
  const { isLoggedIn } = state;
  return { isLoggedIn };
};
