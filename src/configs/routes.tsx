import { ConnectedComponent } from 'react-redux';

import Chat from '../containers/Chat/index';
import Settings from '../containers/Settings';
import Logout from '../components/Logout';
import Items from '../containers/Items';
import Help from '../components/Help';
import Inventory from '../containers/Inventory';
import Character from '../containers/Character';

export interface IRoute {
  path: string;
  component: ConnectedComponent<any, any> | (() => JSX.Element);
  exact?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/text-roleplay/chat',
    component: Chat,
  },
  {
    path: '/text-roleplay/:uid/settings',
    component: Settings,
    exact: true,
  },
  {
    path: '/text-roleplay/:uid/inventory',
    component: Inventory,
    exact: true,
  },
  {
    path: '/text-roleplay/inventory',
    component: Inventory,
    exact: true,
  },
  {
    path: '/text-roleplay/:uid/character',
    component: Character,
    exact: true,
  },
  {
    path: '/text-roleplay/character',
    component: Character,
    exact: true,
  },
  {
    path: '/text-roleplay/settings',
    component: Settings,
    exact: true,
  },
  {
    path: '/text-roleplay/items',
    component: Items,
  },
  {
    path: '/text-roleplay/help',
    component: Help,
  },
  {
    path: '/text-roleplay/logout',
    component: Logout,
  },
];

export default routes;
