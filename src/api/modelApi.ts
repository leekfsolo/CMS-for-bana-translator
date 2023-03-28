import {getDataServerUrl} from 'configuration';
import {dataGetAllParams, IModel} from 'pages/model';
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
  deleteById: (data: {name: string}) => {
    const url = '/api/model/deleteModels';
    return axiosClient.delete(getDataServerUrl(url), {params: data});
  },
  updateById: (id: string) => {
    const url = '/api/model';
    return axiosClient.put(`${getDataServerUrl(url)}/${id}`);
  },
  getAllFilterModels: (params: dataGetAllParams) => {
    const url = '/api/model/getModels';
    return axiosClient.get(getDataServerUrl(url), {params});
  },
  getAll: () => {
    const url = '/api/model/get_all_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  activate: (name: string) => {
    const url = `/api/model/activate_a_model/${name}`;
    return axiosClient.get(getDataServerUrl(url));
  },
  getCurrentModels: () => {
    const url = '/api/model/get_current_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  downloadById: (name: string) => {
    const url = `/api/model/download_a_model/${name}`;
    return axiosClient.get(getDataServerUrl(url), {responseType: 'blob'});
  }
};

export default modelApi;
