import {getDataServerUrl, ignoreHttpsAgent} from 'configuration';
import {dataGetAllParams, IModel} from 'pages/model';
import axiosClient from './axiosClient';

const modelApi = {
  add: (data: IModel) => {
    const url = '/api/model';
    return axiosClient.post(url, data, {httpsAgent: ignoreHttpsAgent});
  },
  getById: (id: string) => {
    const url = '/api/model';
    return axiosClient.get(`${getDataServerUrl(url)}/${id}`, {httpsAgent: ignoreHttpsAgent});
  },
  deleteById: ({id, modelType}: {id: number; modelType: string}) => {
    const url = '/api/model';
    return axiosClient.delete(`${getDataServerUrl(url)}/${modelType}/${id}`, {httpsAgent: ignoreHttpsAgent});
  },
  updateById: (id: string) => {
    const url = '/api/model';
    return axiosClient.put(`${getDataServerUrl(url)}/${id}`, {httpsAgent: ignoreHttpsAgent});
  },
  getAllFilterModels: (params: dataGetAllParams) => {
    const url = '/api/model/getModels';
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent, params});
  },
  getAll: () => {
    const url = '/api/model/get_all_models';
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent});
  },
  getAllNMT: () => {
    const url = '/api/model/get_all_NMT_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  getAllTTS: () => {
    const url = '/api/model/get_all_TTS_models';
    return axiosClient.get(getDataServerUrl(url));
  },
  activate: (id: string) => {
    const url = `/api/model/activate_a_model/${id}`;
    return axiosClient.get(getDataServerUrl(url));
  }
};

export default modelApi;
