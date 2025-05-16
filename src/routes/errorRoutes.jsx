import { lazy } from 'react';
import Loadable from 'components/Loadable';
import AuthLayout from '../layout/Auth';

// project import
const NotFound = Loadable(lazy(() => import('pages/errors/NotFound')));

// ==============================|| ERROR ROUTES ||============================== //

const ErrorRoutes = {
  path: '*',
  element: <AuthLayout />,
  children: [
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default ErrorRoutes;
