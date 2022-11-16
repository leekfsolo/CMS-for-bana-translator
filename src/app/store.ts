import {configureStore} from '@reduxjs/toolkit';
import globalReducer from 'app/globalSlice';

const rootReducer = {
  global: globalReducer
};

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
