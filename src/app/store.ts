import {configureStore} from '@reduxjs/toolkit';
import globalReducer from 'app/globalSlice';
import authReducer from 'pages/Auth/authSlice';

const rootReducer = {
  global: globalReducer,
  auth: authReducer
};

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
