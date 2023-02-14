import React from 'react';
import {PageUrl} from 'configuration/enum';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

const PrivateRoute = () => {
  const location = useLocation();

  return true ? <Outlet /> : <Navigate to={PageUrl.LOGIN} state={{from: location}} replace />;
};

export default PrivateRoute;
