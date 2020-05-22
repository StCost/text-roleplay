import { message as notify } from 'antd';

import actions from '../reducers/actions';
import { IItem, IMessage } from '../reducers/interfaces';
import { diceRegex, exportRolls, hasDice } from './dice';

export const camelize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_./g, (m) => m.toUpperCase())
    .replace(/_/g, '')
};

export const colorFromString = (str: string) => {
  if (!str) return '#000';

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

  if (body.indexOf('*') > -1) {
    message.isRP = true;
  }

  if (/(@[a-zа-яё]*)/mui.test(body)) {
    message.mentioned = true;
  }

  return message;
};

export const validateMessage = (message: string) => {

  if (!message) {
    notify.error('Сообщение пустое');
    return false;
  }

  if (hasDice(message)) {
    const rolls: string[] | null = message.match(/(( |^)[a-zа-я]+\d+[dд]\d+)|(\d+[dд]\d+[a-zа-я]+( |$))|(\d+[dд]\d+)/miug);
    if (rolls) {
      const wasError = rolls.some((roll: string) => {
        if (/(([a-zа-яё])\d+[dд]\d+)|(\d+[dд]\d+([a-zа-яё]))/miug.test(roll)) {
          notify.error(`Ошибка в дайсе ${roll}. Рядом не должно быть символов`);
          return true;
        }

        const [amount, size] = roll.split(/[dд]/u);

        if (parseInt(amount) > 10) {
          notify.error(`Ошибка в дайсе ${roll}. Нельзя бросать больше 10-ти дайсов`);
          return true;
        }

        if ([2,4,6,8,10,12,20].indexOf(parseInt(size)) === -1) {
          notify.error(`Ошибка в дайсе ${roll}. Можно бросать только дайсы размеров 4 6 8 10 12 20`);
          return true;
        }

        return false;
      });
      if (wasError) return false;
    }
  }
  return true;
};

export const generateID = () =>
  '_' + Math.random().toString(36).substr(2, 9);

export const getFailedItem: ((id: string) => IItem) = (id: string) => ({
  id: id,
  type: 'misc',
  name: 'Ошибка',
  weight: 0,
  time: 0,
  effect: id,
  image: '',
  description: 'Такого предмета не существует',
  price: 0,
  capacity: 0,
  armor: 0,
  approved: true,
  failed: true,
  amount: Number.MAX_VALUE,
});

export const getItemName = (item: IItem, showAmount: boolean = true) =>
  `${item ? `'${item.name}'` : 'предмет'}` + (showAmount && item.amount && item.amount >= 2 ? ` (${item.amount}шт)` : '');
