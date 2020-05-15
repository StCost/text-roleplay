import { IState } from '../reducers';
import actions from '../actions';

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

export const colorFromString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
};

export const isOnline = (time?: number) => {
  const lastActivity = time || parseInt(localStorage.getItem('lastActivity') || '0');
  return (lastActivity + 180000) > new Date().getTime();
};

export const doubleDigit = (str: number) => `${str}`.length === 1
  ? `0${str}`
  : str;

export const getTime = (time: number) => {
  const date = new Date(time);
  return [date.getHours(), date.getMinutes(), date.getSeconds()].map(doubleDigit).join(':');
};

export const getDate = (time: number) => {
  const date = new Date(time);
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(doubleDigit).join('.');
};

export const getFullTime = (time: number) => {
  const date = new Date(time);
  const messageTime = [date.getHours(), date.getMinutes(), date.getSeconds()].map(doubleDigit).join(':');
  const messageDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(doubleDigit).join('.');

  return [messageTime, messageDate].join(' ');
};

export const listenForActivity = () => {
  const callback = () => {
    if (!isOnline(parseInt(localStorage.getItem('lastActivity') || '0') - 60000))
      actions.updateLastOnline({});
  };

  [
    'mousedown',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart'
  ].forEach((eventName) => {
    document.addEventListener(eventName, callback, true);
  });
};
