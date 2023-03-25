import {getDataServerUrl, ignoreHttpsAgent} from 'configuration';
import {dataGetAllParams} from 'pages/model';
import axiosClient from './axiosClient';

const dataApi = {
  add: (data: FormData) => {
    const url = '/api/data';
    return axiosClient.post(getDataServerUrl(url), data, {
      httpsAgent: ignoreHttpsAgent,
      headers: {'Content-Type': 'multipart/form-data'}
    });
  },
  getAll: (params: dataGetAllParams) => {
    const url = '/api/data/getAll';
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent, params});
  },
  getById: (id: string) => {
    const url = '/api/data';
    return axiosClient.get(`${getDataServerUrl(url)}/${id}`, {httpsAgent: ignoreHttpsAgent});
  },
  deleteById: (id: string) => {
    const url = '/api/data';
    return axiosClient.delete(`${getDataServerUrl(url)}/${id}`, {httpsAgent: ignoreHttpsAgent});
  },
  updateById: (id: string) => {
    const url = '/api/data';
    return axiosClient.put(`${getDataServerUrl(url)}/${id}`, {httpsAgent: ignoreHttpsAgent});
  }
};

export default dataApi;
