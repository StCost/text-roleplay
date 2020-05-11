import { ConnectedComponent } from 'react-redux';

import Chat from '../components/Chat/index';
import Settings from '../components/Settings';
import Logout from '../components/Logout';

export interface IRoute {
  label: string;
  path: string;
  component: ConnectedComponent<any, any>;
}

const routes: IRoute[] = [
  {
    label: 'Chat',
    path: '/chat',
    component: Chat,
  },
  {
    label: 'Settings',
    path: '/settings',
    component: Settings,
  },
  {
    label: 'Logout',
    path: '/logout',
    component: Logout,
  },
];

export default routes;
