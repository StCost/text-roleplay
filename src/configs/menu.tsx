import React from 'react';
import {
  MessageOutlined,
  // DatabaseOutlined,
  SettingOutlined,
  // AppstoreAddOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  TeamOutlined,
  // IdcardOutlined,
  TrophyOutlined,
  BookOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

export interface IMenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

const menu: IMenuItem[] = [
  {
    "label": "Пользователи",
    "path": "/users",
    icon: <TeamOutlined/>
  },
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
  // {
  //   "label": "Статус",
  //   "path": "./status",
  //   icon: <IdcardOutlined/>
  // },
  // {
  //   "label": "Инвентарь",
  //   "path": "./inventory",
  //   icon: <DatabaseOutlined/>
  // },
  {
    "label": "Характеристики",
    "path": "./stats",
    icon: <SolutionOutlined/>
  },
  {
    "label": "Перки",
    "path": "./perks",
    icon: <TrophyOutlined/>
  },
  {
    "label": "Записи",
    "path": "./notes",
    icon: <BookOutlined/>
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
    "label": "Помощь",
    "path": "/help",
    icon: <QuestionCircleOutlined/>
  },
];

export default menu;
