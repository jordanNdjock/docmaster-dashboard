import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectedRoute from 'components/ProtectedRoute';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const TypeDocumentsIndex = Loadable(lazy(() => import('pages/type_documents/index')));
const AbonnementsIndex = Loadable(lazy(() => import('pages/abonnements/index')));
const UtilisateurIndex = Loadable(lazy(() => import('pages/utilisateurs')));
const DocmastersIndex = Loadable(lazy(() => import('pages/docmasters')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/index',
      element: <DashboardDefault />
    },
    {
      path: 'abonnements',
      element: <AbonnementsIndex />
    },
    {
      path: 'type-documents',
      element: <TypeDocumentsIndex />
    },
    {
      path: 'utilisateurs',
      element: <UtilisateurIndex />
    },
    {
      path: 'declarations',
      element: <DocmastersIndex />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
