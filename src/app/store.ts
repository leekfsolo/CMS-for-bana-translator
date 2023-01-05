import {configureStore} from '@reduxjs/toolkit';
import globalReducer from 'app/globalSlice';
import authReducer from 'pages/Auth/authSlice';
import registerReducer from 'pages/Register/registerSlice';

const rootReducer = {
  global: globalReducer,
  auth: authReducer,
  register: registerReducer
};

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
