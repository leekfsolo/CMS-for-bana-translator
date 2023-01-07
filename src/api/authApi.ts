import {IFormLogin} from 'pages/interface';
import axiosClient from './axiosClient';

const authApi = {
  login: (data: IFormLogin) => {
    const url = '/api/authenticate/login';
    return axiosClient.post(url, data);
  },
  logout: () => {
    const url = '/api/authenticate/logout';
    return axiosClient.post(url);
  },
  refresh: () => {
    const url = '/api/authenticate/refresh';
    return axiosClient.post(url);
  },
  getMyInfo: () => {
    const url = '/api/authenticate/getMyInfo';
    return axiosClient.get(url);
  }
};

export default authApi;
