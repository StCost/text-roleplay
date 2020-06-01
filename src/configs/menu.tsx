import React from 'react';
import {
  MessageOutlined,
  // DatabaseOutlined,
  SettingOutlined,
  // AppstoreAddOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  TeamOutlined,
  IdcardOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

export interface IMenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

const menu: IMenuItem[] = [
  {
    "label": "Логи",
    "path": "/chat",
    icon: <MessageOutlined/>
  },
  {
    "label": "Выйти",
    "path": "/logout",
    icon: <LogoutOutlined/>
  }
];

export const characterMenu: IMenuItem[] = [
  {
    "label": "Перки",
    "path": "./perks",
    icon: <TrophyOutlined />
  },
  // {
  //   "label": "Инвентарь",
  //   "path": "./inventory",
  //   icon: <DatabaseOutlined/>
  // },
  {
    "label": "Характеристики",
    "path": "./stats",
    icon: <IdcardOutlined/>
  },
];

export const userMenu: IMenuItem[] = [
  {
    "label": "Настройки",
    "path": "./settings",
    icon: <SettingOutlined/>
  },
  // {
  //   "label": "Предметы",
  //   "path": "/items",
  //   icon: <AppstoreAddOutlined/>
  // },
  {
    "label": "Пользователи",
    "path": "/users",
    icon: <TeamOutlined/>
  },
  {
    "label": "Помощь",
    "path": "/help",
    icon: <QuestionCircleOutlined/>
  },
];

export default menu;
