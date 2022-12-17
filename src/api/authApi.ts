import {IFormLogin} from 'pages/interface';
import axiosClient from './axiosClient';

const authApi = {
  login: (data: IFormLogin) => {
    const url = '/login';
    console.log(data);
    return axiosClient.post(url, data);
  }
};

export default authApi;
