import { ConnectedComponent } from 'react-redux';

import Chat from '../containers/Chat/index';
import Settings from '../containers/Settings';
import Logout from '../components/Logout';
import Inventory from "../containers/Inventory";

export interface IRoute {
  path: string;
  component: ConnectedComponent<any, any>;
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
    path: '/text-roleplay/settings',
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
    path: '/text-roleplay/logout',
    component: Logout,
  },
];

export default routes;
