import {PageUrl} from 'configuration/enum';
import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = false;
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to={PageUrl.LOGIN} state={{from: location}} replace />;
};

export default PrivateRoute;
