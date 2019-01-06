import Dashboard from 'screens/Dashboard';
import Onboarding from 'screens/Onboarding';
import Welcome from 'screens/Welcome';

export default [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/onboarding/:type',
    component: Onboarding,
  },
  {
    path: '/welcome',
    component: Welcome,
  },
];
