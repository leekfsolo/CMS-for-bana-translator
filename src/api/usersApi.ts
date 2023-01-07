import {IProfile} from 'pages/model';
import axiosClient from './axiosClient';

const usersApi = {
  register: (data: IProfile) => {
    const url = '/api/users/signup';
    return axiosClient.post(url, data);
  },
  changePassword: (data: IProfile) => {
    const url = '/api/users/changePassword';
    return axiosClient.post(url, data);
  }
};

export default usersApi;
