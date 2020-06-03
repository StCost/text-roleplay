export interface IRoute {
  path: string;
  component: string;
  exact?: boolean;
}

const getRouteWithUID = (route: IRoute) => ([
  {
    ...route,
    exact: true,
  },
  {
    path: `/:uid${route.path}`,
    component: route.component,
    exact: true,
  },
]);

const routes: IRoute[] = [
  {
    path: '/chat',
    component: 'containers/Chat',
  },
  ...getRouteWithUID({
    path: '/inventory',
    component: 'containers/Inventory',
  }),
  ...getRouteWithUID({
    path: '/perks',
    component: 'containers/Perks',
  }),
  ...getRouteWithUID({
    path: '/stats',
    component: 'containers/Character',
  }),
  ...getRouteWithUID({
    path: '/notes',
    component: 'components/Notebook',
  }),
  ...getRouteWithUID({
    path: '/settings',
    component: 'containers/Settings',
  }),
  ...getRouteWithUID({
    path: '/status',
    component: 'containers/Status'
  }),
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
