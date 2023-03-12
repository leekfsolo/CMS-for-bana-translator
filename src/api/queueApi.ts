import {getDataServerUrl} from 'configuration';
import {ITaskUpload} from 'pages/model';
import axiosClient from './axiosClient';

const queueApi = {
  addTask: (data: ITaskUpload) => {
    const url = '/api/queue/add_new_task';
    return axiosClient.post(getDataServerUrl(url), data);
  },

  cancelTask: (id: string) => {
    const url = `/api/queue/cancel_a_task/${id}`;
    return axiosClient.get(getDataServerUrl(url));
  },

  getTasksInQueue: () => {
    const url = '/api/queue/count_tasks_in_queue';
    return axiosClient.get(getDataServerUrl(url));
  },

  getAllTasks: () => {
    const url = '/api/queue/get_all_tasks';
    return axiosClient.get(getDataServerUrl(url));
  },

  getStreamLog: (id: string) => {
    const url = `/api/queue/stream_log_task/${id}`;
    return axiosClient.get(getDataServerUrl(url));
  }
};

export default queueApi;
