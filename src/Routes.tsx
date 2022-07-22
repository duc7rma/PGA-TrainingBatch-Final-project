import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import CreateUserPage from 'modules/components/User/pages/UserPage/CreateUserPage';

const UserPage = lazy(() => import('./modules/components/User/pages/UserPage/UserPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute path={ROUTES.userCreate} component={CreateUserPage} />
        <ProtectedRoute path={ROUTES.userManager} component={UserPage} />
      </Switch>
    </Suspense>
  );
};
