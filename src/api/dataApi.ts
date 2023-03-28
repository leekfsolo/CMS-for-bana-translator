import {getDataServerUrl} from 'configuration';
import {dataGetAllParams, IData} from 'pages/model';
import axiosClient from './axiosClient';

const dataApi = {
  add: (data: FormData) => {
    const url = '/api/data';
    return axiosClient.post(getDataServerUrl(url), data, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
  },
  getAll: (params: dataGetAllParams) => {
    const url = '/api/data/getAll';
    return axiosClient.get(getDataServerUrl(url), {params});
  },
  getById: (id: string) => {
    const url = '/api/data';
    return axiosClient.get(`${getDataServerUrl(url)}/${id}`);
  },
  deleteById: (id: string) => {
    const url = '/api/data';
    return axiosClient.delete(`${getDataServerUrl(url)}/${id}`);
  },
  updateById: (data: Partial<IData> & {id?: string}) => {
    const {id} = data;
    const url = '/api/data';
    return axiosClient.put(`${getDataServerUrl(url)}/${id}`, data);
  },
  downloadById: (id: string) => {
    const url = '/api/data/download';
    return axiosClient.get(`${getDataServerUrl(url)}/${id}`, {responseType: 'blob'});
  }
};

export default dataApi;
