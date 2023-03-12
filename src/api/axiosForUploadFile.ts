import {useEffect, ReactElement} from 'react';
import axios, {AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import queryString from 'query-string';
import Config from 'configuration';
import useRefreshToken from 'utils/hooks/useRefreshToken';

interface retryAxiosResponseConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClientForUploadFile = axios.create({
  headers: {
    'content-type': 'multipart/form-data'
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

const AxiosInterceptor = ({children}: {children: ReactElement}): ReactElement => {
  const refresh = useRefreshToken();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    };

    const reqInterceptor = (config: AxiosRequestConfig) => {
      const authJson = localStorage.getItem(Config.storageKey.auth);

      if (authJson) {
        const authValue = {
          ...JSON.parse(authJson)
        };
        if (authValue && config.headers) {
          config.headers.Authorization = `Bearer ${authValue.accessToken}`;
        }
      }
      return config;
    };

    const errInterceptor = async (error: AxiosError) => {
      const originalRequest = error.config;
      const retryRequest: retryAxiosResponseConfig = {
        ...originalRequest
      };
      if (error.response?.status === 401 && !retryRequest._retry) {
        retryRequest._retry = true;
        const res = await refresh();

        return axiosClientForUploadFile(retryRequest);
      }

      return Promise.reject(error);
    };

    const responseInterceptor = axiosClientForUploadFile.interceptors.response.use(resInterceptor, errInterceptor);
    const requestInterceptor = axiosClientForUploadFile.interceptors.request.use(reqInterceptor, errInterceptor);

    return () => {
      axiosClientForUploadFile.interceptors.response.eject(responseInterceptor);
      axiosClientForUploadFile.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return children;
};

export {AxiosInterceptor};
export default axiosClientForUploadFile;
