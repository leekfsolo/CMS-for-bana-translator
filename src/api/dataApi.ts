import {IData} from 'pages/model';
import axiosClient from './axiosClient';

const dataApi = {
  add: (data: IData) => {
    const url = '/api/data';
    return axiosClient.post(url, data);
  },
  getAll: () => {
    const url = '/api/data/getAllData';
    return axiosClient.get(url);
  },
  getById: (id: string) => {
    const url = '/api/data';
    return axiosClient.get(`${url}/${id}`);
  },
  deleteById: (id: string) => {
    const url = '/api/data';
    return axiosClient.delete(`${url}/${id}`);
  },
  updateById: (id: string) => {
    const url = '/api/data';
    return axiosClient.put(`${url}/${id}`);
  }
};

export default dataApi;
