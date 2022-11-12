import React from 'react';
import {PageUrl} from 'configuration/enum';
import Auth from 'pages/Auth';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from 'pages/Dashboard';
import ModelManagement from 'pages/Model-management';
import DataManagement from 'pages/Data-management';
import Training from 'pages/Training';
import Testing from 'pages/Testing';
import MainLayout from 'components/MainLayout';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path={PageUrl.LOGIN} element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path={PageUrl.HOME} element={<MainLayout />}>
            <Route path={PageUrl.DASHBOARD} element={<Dashboard />} />
            <Route path={PageUrl.MODEL_MANAGEMENT} element={<ModelManagement />} />
            <Route path={PageUrl.DATA_MANAGEMENT} element={<DataManagement />} />
            <Route path={PageUrl.TRAINING} element={<Training />} />
            <Route path={PageUrl.TESTING} element={<Testing />} />
            <Route path={PageUrl.ALL} element={<Auth />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
