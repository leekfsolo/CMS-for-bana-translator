import React from 'react';
import Config from 'configuration';
import {PageUrl} from 'configuration/enum';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem(Config.storageKey.auth)?.length;
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to={PageUrl.LOGIN} state={{from: location}} replace />;
};

export default PrivateRoute;
