import {getUserServerUrl} from 'configuration';
import {IChangePassword, IProfile} from 'pages/model';
import axiosClient from './axiosClient';

const usersApi = {
  register: (data: IProfile) => {
    const url = '/api/users/signup';
    return axiosClient.post(getUserServerUrl(url), data);
  },
  changePassword: (data: IChangePassword) => {
    const url = '/api/users/changePassword';
    return axiosClient.post(getUserServerUrl(url), data);
  }
};

export default usersApi;
