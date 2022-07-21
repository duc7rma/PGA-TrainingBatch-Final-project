import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import { DefaultLayout } from 'components/Layout';
// import UserPage from 'modules/components/User/pages/UserPage/UserPage';
import CreateUserPage from 'modules/components/User/pages/UserPage/CreateUserPage';

const UserPage = lazy(() => import('./modules/components/User/pages/UserPage/UserPage'));
// const CreateUser = lazy(() => import('./modules/components/User/pages/UserPage/CreateUser'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));

const publicRoutes = [
  { path: ROUTES.userManager, component: UserPage },
  { path: ROUTES.userCreate, component: CreateUserPage },
  // { path: ROUTES.userDetail, component: UserPage },
];

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route exact path="/" component={LoginPage} />
        {publicRoutes.map((route, index: number) => {
          const Page = route.component;
          return (
            <DefaultLayout key={index}>
              <ProtectedRoute key={index} path={route.path} component={Page} />
            </DefaultLayout>
          );
        })}

        {/* <ProtectedRoute path={ROUTES.userManager} component={UserPage} /> */}
      </Switch>
    </Suspense>
  );
};
