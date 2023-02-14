import {getUserServerUrl} from 'configuration';
import {IFormLogin} from 'pages/interface';
import axiosClient from './axiosClient';

const authApi = {
  login: (data: IFormLogin) => {
    const url = '/api/authenticate/login';
    return axiosClient.post(getUserServerUrl(url), data);
  },
  logout: () => {
    const url = '/api/authenticate/logout';
    return axiosClient.post(getUserServerUrl(url));
  },
  refresh: () => {
    const url = '/api/authenticate/refresh';
    return axiosClient.post(getUserServerUrl(url));
  },
  getMyInfo: () => {
    const url = '/api/authenticate/getMyInfo';
    return axiosClient.get(getUserServerUrl(url));
  }
};

export default authApi;
