import randomInt from 'random-seed';
import actions from '../actions';
import { IMessage } from '../reducers';
import { diceRegex, exportRolls } from './dice';
// @ts-ignore
window.randomInt = randomInt;

export const camelize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_./g, (m) => m.toUpperCase())
    .replace(/_/g, '')
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
  if (!time) return false;
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
  callback();
};

export const isURL = (str: string) =>
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/igm.test(str);

export const processMessages = (messages: IMessage[]) => {
  return messages
    .filter((item: IMessage, pos: number, self: IMessage[]) =>
      self.findIndex((_i: IMessage) => _i.time === item.time) === pos
    )
    .sort((a: IMessage, b: IMessage) => b.time - a.time)
    .map((m: IMessage, index: number, messages: IMessage[]) => {
      if (index < messages.length - 2) {
        if (m.author === messages[index + 1].author) {
          return {
            ...m,
            grouped: true,
          }
        }
      }
      return m;
    })
};

export const formatMessage = (message: IMessage) => {
  const { body } = message;

  if (diceRegex.test(body)) {
    message.rolls = exportRolls(body);
  }

  if (/\*/.test(body)) {
    message.isRP = true;
  }

  if (/(@[a-zа-яё]*)/mui.test(body)) {
    message.mentioned = true;
  }

  return message;
};
