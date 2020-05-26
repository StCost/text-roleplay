export interface IRoute {
  path: string;
  component: string;
  exact?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/text-roleplay/chat',
    component: 'containers/Chat',
  },
  {
    path: '/text-roleplay/:uid/settings',
    component: 'containers/Settings',
    exact: true,
  },
  {
    path: '/text-roleplay/:uid/inventory',
    component: 'containers/Inventory',
    exact: true,
  },
  {
    path: '/text-roleplay/inventory',
    component: 'containers/Inventory',
    exact: true,
  },
  {
    path: '/text-roleplay/:uid/character',
    component: 'containers/Character',
    exact: true,
  },
  {
    path: '/text-roleplay/character',
    component: 'containers/Character',
    exact: true,
  },
  {
    path: '/text-roleplay/settings',
    component: 'containers/Settings',
    exact: true,
  },
  {
    path: '/text-roleplay/items',
    component: 'containers/Items',
  },
  {
    path: '/text-roleplay/help',
    component: 'components/Help',
  },
  {
    path: '/text-roleplay/logout',
    component: 'components/Logout',
  },
];

export default routes;
