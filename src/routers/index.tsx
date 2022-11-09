import React from 'react';
import {PageUrl} from 'configuration/enum';
import Auth from 'pages/Auth';
import Home from 'pages/Home';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path={PageUrl.LOGIN} element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path={PageUrl.HOME} element={<Home />} />
          <Route path={PageUrl.ALL} element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
