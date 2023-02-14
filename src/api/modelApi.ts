import {getDataServerUrl} from 'configuration';
import {IModel} from 'pages/model';
import axiosClient from './axiosClient';

const modelApi = {
  add: (data: IModel) => {
    const url = '/api/model';
    return axiosClient.post(url, data);
  },
  getById: (id: string) => {
    const url = '/api/model';
    return axiosClient.get(`${getDataServerUrl(url)}/${id}`);
  },
  deleteById: (id: string) => {
    const url = '/api/model';
    return axiosClient.delete(`${getDataServerUrl(url)}/${id}`);
  },
  updateById: (id: string) => {
    const url = '/api/model';
    return axiosClient.put(`${getDataServerUrl(url)}/${id}`);
  },
  getAll: () => {
    const url = '/api/model/get_all_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  getAllNMT: () => {
    const url = '/api/model/get_all_NMT_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  getAllTTS: () => {
    const url = '/api/model/get_all_TTS_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  getAllMyNMT: () => {
    const url = '/api/model/get_all_my_NMT_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  getAllMyTTS: () => {
    const url = '/api/model/get_all_my_TTS_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  getAllMy: () => {
    const url = '/api/model/get_all_my_models';
    return axiosClient.get(getDataServerUrl(url));
  }
};

export default modelApi;
