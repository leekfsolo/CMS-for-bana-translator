import {getDataServerUrl, ignoreHttpsAgent} from 'configuration';
import {ITaskUpload} from 'pages/model';
import axiosClient from './axiosClient';

const queueApi = {
  addTask: (data: ITaskUpload) => {
    const url = '/api/queue/add_new_task';
    return axiosClient.post(getDataServerUrl(url), data, {httpsAgent: ignoreHttpsAgent});
  },

  cancelTask: (id: string) => {
    const url = `/api/queue/cancel_a_task/${id}`;
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent});
  },

  getTasksInQueue: () => {
    const url = '/api/queue/count_tasks_in_queue';
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent});
  },

  getAllTasks: () => {
    const url = '/api/queue/get_all_tasks';
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent});
  },

  getStreamLog: (id: string) => {
    const url = `/api/queue/stream_log_task/${id}`;
    return axiosClient.get(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent});
  },

  deleteTask: (id: string) => {
    const url = `/api/queue/deleteTasks/${id}`;
    return axiosClient.delete(getDataServerUrl(url), {httpsAgent: ignoreHttpsAgent});
  }
};

export default queueApi;
