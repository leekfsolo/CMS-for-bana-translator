import {IModel} from 'pages/model';
import axiosClient from './axiosClient';

const modelApi = {
  add: (data: IModel) => {
    const url = '/api/model';
    return axiosClient.post(url, data);
  },
  getAll: () => {
    const url = '/api/model/getAllModel';
    return axiosClient.get(url);
  },
  getById: (id: string) => {
    const url = '/api/model';
    return axiosClient.get(`${url}/${id}`);
  },
  deleteById: (id: string) => {
    const url = '/api/model';
    return axiosClient.delete(`${url}/${id}`);
  },
  updateById: (id: string) => {
    const url = '/api/model';
    return axiosClient.put(`${url}/${id}`);
  }
};

export default modelApi;
