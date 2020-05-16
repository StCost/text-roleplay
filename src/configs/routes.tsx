import { ConnectedComponent } from 'react-redux';

import Chat from '../components/Chat/index';
import Settings from '../components/Settings';
import Logout from '../components/Logout';

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
    path: '/text-roleplay/settings/:uid',
    component: Settings,
  },
  {
    path: '/text-roleplay/settings',
    component: Settings,
  },
  {
    path: '/text-roleplay/logout',
    component: Logout,
  },
];

export default routes;
