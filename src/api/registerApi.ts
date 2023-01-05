import {IProfile} from 'pages/interface';
import axiosClient from './axiosClient';

const registerApi = {
  register: (data: IProfile) => {
    const url = '/api/signup';
    return axiosClient.post(url, data);
  }
};

export default registerApi;
