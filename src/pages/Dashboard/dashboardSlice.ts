import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import modelApi from 'api/modelApi';
import queueApi from 'api/queueApi';
import moment from 'moment';
import {IDashboardData} from 'pages/interface';
import {ITaskData} from 'pages/model';
import {getRoundedFloat} from 'utils/helpers/getRoundedFloat';

const initialState: IDashboardData = {
  tasksData: [],
  totalTasks: 0,
  currentModels: []
};

export const getTotalTasksInQueue = createAsyncThunk('dashboard/getTaskInQueue', async () => {
  const res = await queueApi.getTasksInQueue();
  return res;
});

export const getTotalTasks = createAsyncThunk('dashboard/getAllTasks', async () => {
  const res = await queueApi.getAllTasks();
  return res;
});

export const deleteTask = createAsyncThunk('dashboard/deletTask', async (data: {taskID: string[]}) => {
  const res = await queueApi.deleteTask(data);
  return res;
});

export const cancelTask = createAsyncThunk('dashboard/deletTask', async (id: string) => {
  const res = await queueApi.cancelTask(id);
  return res;
});

export const getCurrentModels = createAsyncThunk('dashboard/currentModel', async () => {
  const res = await modelApi.getCurrentModels();
  return res;
});

const STATUS = ['waiting', 'processing', 'completed', 'error'];

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getTotalTasksInQueue.fulfilled, (state, action: PayloadAction<any>) => {
        state.totalTasks = action.payload.num_tasks;
      })
      .addCase(getCurrentModels.fulfilled, (state, action: PayloadAction<any>) => {
        const currentModels = action.payload.map((model: any) => {
          const {model_type, model_name, accuracy, createdDate, diff_loss, dur_loss, prior_loss} = model;

          const lossData =
            model_type === 'tts'
              ? {
                  diff_loss: getRoundedFloat(diff_loss),
                  dur_loss: getRoundedFloat(dur_loss),
                  prior_loss: getRoundedFloat(prior_loss)
                }
              : {bleu_score: getRoundedFloat(accuracy)};

          return {
            model_type: model_type.toUpperCase(),
            model_name,
            createdDate: createdDate ? moment(createdDate).format('DD/MM/YYYY') : null,
            ...lossData
          };
        });

        state.currentModels = currentModels;
      })
      .addCase(getTotalTasks.fulfilled, (state, action: PayloadAction<any>) => {
        const tasks = action.payload.map(({task, user}: {task: ITaskData; user: any}) => {
          const {accuracy, task_id, task_type, model_name, state, filename, diff_loss, dur_loss, prior_loss} = task;

          return {
            id: task_id,
            username: user.username,
            model_name,
            filename,
            task_type,
            accuracy: getRoundedFloat(accuracy),
            diff_loss: getRoundedFloat(diff_loss),
            dur_loss: getRoundedFloat(dur_loss),
            prior_loss: getRoundedFloat(prior_loss),
            status: STATUS[state]
          };
        });
        state.tasksData = tasks;
      });
  }
});

const {reducer} = dashboard;
export default reducer;
