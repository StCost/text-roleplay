import React from 'react';
import {
  MessageOutlined,
  DatabaseOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export interface IMenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

const menu: IMenuItem[] = [
  {
    "label": "Чат",
    "path": "/chat",
    icon: <MessageOutlined/>,
  },
  {
    "label": "Инвентарь",
    "path": "./inventory",
    icon: <DatabaseOutlined/>,
  },
  {
    "label": "Персонаж",
    "path": "./character",
    icon: <UserOutlined/>
  },
  {
    "label": "Настройки",
    "path": "./settings",
    icon: <SettingOutlined/>
  },
  {
    "label": "Предметы",
    "path": "/items",
    icon: <AppstoreAddOutlined/>
  },
  {
    "label": "Помощь",
    "path": "/help",
    icon: <QuestionCircleOutlined/>
  },
  {
    "label": "Выйти",
    "path": "/logout",
    icon: <LogoutOutlined/>
  }
];

export default menu;
