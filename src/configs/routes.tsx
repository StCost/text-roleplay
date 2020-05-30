export interface IRoute {
  path: string;
  component: string;
  exact?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/chat',
    component: 'containers/Chat',
  },
  {
    path: '/:uid/settings',
    component: 'containers/Settings',
    exact: true,
  },
  {
    path: '/:uid/inventory',
    component: 'containers/Inventory',
    exact: true,
  },
  {
    path: '/inventory',
    component: 'containers/Inventory',
    exact: true,
  },
  {
    path: '/:uid/character',
    component: 'containers/Character',
    exact: true,
  },
  {
    path: '/character',
    component: 'containers/Character',
    exact: true,
  },
  {
    path: '/settings',
    component: 'containers/Settings',
    exact: true,
  },
  {
    path: '/items',
    component: 'containers/Items',
  },
  {
    path: '/users',
    component: 'components/Users',
  },
  {
    path: '/help',
    component: 'components/Help',
  },
  {
    path: '/logout',
    component: 'components/Logout',
  },
];

export default routes;
