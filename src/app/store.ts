import {configureStore} from '@reduxjs/toolkit';
import globalReducer from 'app/globalSlice';
import authReducer from 'pages/Auth/authSlice';
import registerReducer from 'pages/Register/registerSlice';
import modelManagementReducer from 'pages/Model-management/modelManagementSlice';
import dataManagementReducer from 'pages/Data-management/dataManagementSlice';
import trainingManagementReducer from 'pages/Training/trainingSlice';
import dashboardReducer from 'pages/Dashboard/dashboardSlice';

const rootReducer = {
  global: globalReducer,
  auth: authReducer,
  register: registerReducer,
  modelManagement: modelManagementReducer,
  dataManagement: dataManagementReducer,
  training: trainingManagementReducer,
  dashboard: dashboardReducer
};

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
