import Dashboard from 'screens/Dashboard';
import Wizard from 'screens/Wizard';
import Welcome from 'screens/Welcome';

/* NOTE: the order of these routes matters */
export default [
  {
    path: '/welcome',
    component: Welcome,
  },
  {
    path: '/wizard/:type',
    component: Wizard,
  },
  {
    path: '/',
    component: Dashboard,
  },
];
