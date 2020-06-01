import React from 'react';
import { message as notify } from 'antd';

import { IItem, IMessage, IState, IUser } from '../reducers/interfaces';
import { diceRegex, exportRolls, hasDice } from './dice';
import Image from "../components/Image";
import YoutubeEmbed from "../components/YoutubeEmbed";
import { RouteComponentProps } from "react-router";

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
  return (lastActivity + 180000) > Date.now();
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

        if ([2, 4, 6, 8, 10, 12, 20].indexOf(parseInt(size)) === -1) {
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
  discriminator: 'IItem',
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

export const replaceString = (string: string, callback: (word: string, index: number) => string | JSX.Element) => {
  return string.split(' ').map((word: string, index: number) => {
    return callback ? callback(word, index) : ` ${word}`;
  });
};


export const urlRegex = /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/igm;
export const youtubeRegex = /(^| )https?:\/\/(www\.)?((youtube\.com(\/embed)?\/watch\?v=)|(youtu.be\/))[a-z0-9-_]{11}(\?t=[0-9]+)?(&feature=related)?(&list=[a-z0-9-_]{13})?(&index=[0-9]+)?(&t=[0-9]+)?/igm;
export const imageRegex = /(^| )https?:\/\/(.*)\.(gif|jpe?g|tiff|png|webp|bmp)($| )/igm;

export const isURL = (str: string) => urlRegex.test(str);
export const getURLs = (str: string) => str.match(urlRegex);

export const processLinks = (body: string) => {
  const links = getURLs(body);

  if (links && links.length > 0) {
    const linkedBody = replaceString(body, (word: string, index: number) => {
      const match = links.find((link: string) => link.trim() === word.trim());
      return match
        ? (
          <React.Fragment key={word + index}>
            {' '}
            <a
              href={word}
              target="_blank"
              rel="noopener noreferrer"
            >
              {word}
            </a>
          </React.Fragment>
        ) : (
          ` ${word}`
        )
    });

    const images = body.match(imageRegex);
    const youtube = body.match(youtubeRegex);

    return (
      <>
        <span>{linkedBody}</span>
        {images && images.map((image: string, index: number) => (
          <Image src={image} key={image + index}/>
        ))}
        {youtube && youtube.map((link: string, index: number) => (
          <YoutubeEmbed link={link} key={link + index}/>
        ))}
      </>
    );
  }
  return null;
};

export const getUserStatus = (user: IUser) => {
  const { status, lastOnline } = user;

  switch (status) {
    case 'online':
      if (lastOnline + 180000 > Date.now())
        return 'online';
    // Fallthrough is intended. If lastOnline is too far - user is not actually online
    case 'afk':
      if (lastOnline + 600000 > Date.now())
        return 'afk';
    // Fallthrough is intended. If lastOnline is too far - user is not actually afk
    default:
      return 'offline';
  }
};

export const getStateUser = (state: IState, props: RouteComponentProps) => {
  const { users, currentUser, loading, characters } = state;

  const uid = new URLSearchParams(props.match.params).get('uid') || state.uid || localStorage.getItem('uid') || '0';
  const user = users[uid];
  const character = characters[uid];

  return {
    loading,
    user,
    uid,
    hasRight: (!!user && !!currentUser) && (currentUser.uid === user.uid || !!currentUser.isAdmin),
    currentUser,
    character,
  }
};

