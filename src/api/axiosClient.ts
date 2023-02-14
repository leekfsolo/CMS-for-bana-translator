import axios from 'axios';
import queryString from 'query-string';
import {getCookie} from 'utils/helpers/getCookie';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
  const tokenValue = getCookie('csrf_access_cookie');

  if (tokenValue && config.headers) {
    config.withCredentials = true;
    config.headers['X-CRSF-TOKEN'] = tokenValue;
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
