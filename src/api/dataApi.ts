import {getDataServerUrl, ignoreHttpsAgent} from 'configuration';
import {IData} from 'pages/model';
import axiosClient from './axiosClient';
import axiosClientForUploadFile from './axiosForUploadFile';

const dataApi = {
  add: (data: IData) => {
    const url = '/api/data';
    return axiosClientForUploadFile.post(getDataServerUrl(url), data);
  },
  getAll: () => {
    const url = '/api/data/getAll';
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent});
  },
  getById: (id: string) => {
    const url = '/api/data';
    return axiosClient.get(`${getDataServerUrl(url)}/${id}`);
  },
  deleteById: (id: string) => {
    const url = '/api/data';
    return axiosClient.delete(`${getDataServerUrl(url)}/${id}`);
  },
  updateById: (id: string) => {
    const url = '/api/data';
    return axiosClient.put(`${getDataServerUrl(url)}/${id}`);
  }
};

export default dataApi;
