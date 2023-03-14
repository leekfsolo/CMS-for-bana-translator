import {getDataServerUrl, ignoreHttpsAgent} from 'configuration';
import {dataGetAllParams, IData} from 'pages/model';
import axiosClient from './axiosClient';
import axiosClientForUploadFile from './axiosForUploadFile';

const dataApi = {
  add: (data: IData) => {
    const url = '/api/data';
    return axiosClientForUploadFile.post(getDataServerUrl(url), data, {httpsAgent: ignoreHttpsAgent});
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
