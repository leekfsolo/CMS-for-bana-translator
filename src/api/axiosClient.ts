import axios from 'axios';
import queryString from 'query-string';
import Config from 'configuration';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: Config.apiConfig.endPoint,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
  const authJson = localStorage.getItem(Config.storageKey.auth);

  if (authJson) {
    const authValue = {
      ...JSON.parse(authJson)
    };
    if (authValue.auth && config.headers) {
      config.headers.Authorization = `Bearer ${authValue.auth.token}`;
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // handle middleware
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
