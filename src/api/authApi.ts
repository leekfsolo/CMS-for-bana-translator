import {IFormLogin} from 'pages/interface';
import axiosClient from './axiosClient';

const authApi = {
  login: (data: IFormLogin) => {
    const url = '/api/login';
    return axiosClient.post(url, data);
  },
  logout: () => {
    const url = '/api/logout';
    return axiosClient.post(url);
  },
  refresh: () => {
    const url = '/api/refresh';
    return axiosClient.post(url);
  },
  getMyInfo: () => {
    const url = '/api/getMyInfo';
    return axiosClient.get(url);
  }
};

export default authApi;
