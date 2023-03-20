import {StyledEngineProvider} from '@mui/material/styles';
import {AxiosInterceptor} from 'api/axiosClient';
import store from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import Routers from 'routers';
import '_styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <AxiosInterceptor>
        <Routers />
      </AxiosInterceptor>
    </Provider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
