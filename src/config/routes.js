import Dashboard from 'screens/Dashboard';
import Wizard from 'screens/Wizard';
import Welcome from 'screens/Welcome';

export default [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/wizard/:type',
    component: Wizard,
  },
  {
    path: '/welcome',
    component: Welcome,
  },
];
