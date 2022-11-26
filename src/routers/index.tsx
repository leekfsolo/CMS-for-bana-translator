import React from 'react';
import {PageUrl} from 'configuration/enum';
import Auth from 'pages/Auth';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from 'pages/Dashboard';
import ModelManagement from 'pages/Model-management';
import DataManagement from 'pages/Data-management';
import Training from 'pages/Training';
import MainLayout from 'components/MainLayout';
import ModalBackdrop from 'components/ModalBackdrop';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import GlobalLoading from 'components/GlobalLoading';

const Routers = () => {
  return (
    <Router>
      <GlobalLoading />
      <Routes>
        <Route path={PageUrl.LOGIN} element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path={PageUrl.HOME} element={<MainLayout />}>
            <Route index path={PageUrl.DASHBOARD} element={<Dashboard />} />
            <Route path={PageUrl.MODEL_MANAGEMENT} element={<ModelManagement />} />
            <Route path={PageUrl.DATA_MANAGEMENT} element={<DataManagement />} />
            <Route path={PageUrl.TRAINING} element={<Training />} />
            <Route path={PageUrl.PROFILE} element={<Profile />} />
            <Route path={PageUrl.CREATE_ACCOUNT} element={<Register />} />
          </Route>
          <Route path={PageUrl.ALL} element={<Navigate to={PageUrl.LOGIN} replace={true} />} />
        </Route>
      </Routes>
      <ModalBackdrop />
    </Router>
  );
};

export default Routers;
