import { ConnectedComponent } from 'react-redux';

import Chat from '../components/Chat/index';
import Settings from '../components/Settings';
import Logout from '../components/Logout';

export interface IRoute {
  label: string;
  path: string;
  component: ConnectedComponent<any, any>;
  exact?: boolean;
}

const routes: IRoute[] = [
  {
    label: 'Chat',
    path: '/text-roleplay/chat',
    component: Chat,
  },
  {
    label: 'Settings',
    path: '/text-roleplay/settings',
    component: Settings,
    exact: true,
  },
  {
    label: 'Logout',
    path: '/text-roleplay/logout',
    component: Logout,
  },
];

export default routes;
