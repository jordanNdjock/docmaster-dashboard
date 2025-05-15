import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// project import
const NotFound = Loadable(lazy(() => import('pages/errors/NotFound')));

// ==============================|| ERROR ROUTES ||============================== //

const ErrorRoutes = {
  path: '*',
  element: <MinimalLayout />,
  children: [
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default ErrorRoutes;
