import axios from 'axios';
import Config, {getUserServerUrl} from 'configuration';
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
    const authJson = localStorage.getItem(Config.storageKey.auth);
    let refreshToken = '';

    if (authJson) {
      const authValue = {
        ...JSON.parse(authJson)
      };
      if (authValue) {
        refreshToken = authValue.refreshToken;
      }

      console.log(authJson, authValue);
    }

    const url = '/api/authenticate/refresh';
    return axios.post(
      getUserServerUrl(url),
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
  },
  getMyInfo: () => {
    const url = '/api/authenticate/getMyInfo';
    return axiosClient.get(getUserServerUrl(url));
  }
};

export default authApi;
