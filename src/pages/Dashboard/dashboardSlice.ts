import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import queueApi from 'api/queueApi';
import Config from 'configuration';
import {IDashboardData} from 'pages/interface';
import {ITaskData} from 'pages/model';

const initialState: IDashboardData = {
  tasksData: [],
  totalTasks: 0
};

export const getTotalTasksInQueue = createAsyncThunk('dashboard/getTaskInQueue', async () => {
  const res = await queueApi.getTasksInQueue();
  return res;
});

export const getTotalTasks = createAsyncThunk('dashboard/getAllTasks', async () => {
  const res = await queueApi.getAllTasks();
  return res;
});

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getTotalTasksInQueue.fulfilled, (state, action: PayloadAction<any>) => {
        state.totalTasks = action.payload.num_tasks;
      })
      .addCase(getTotalTasks.fulfilled, (state, action: PayloadAction<any>) => {
        const tasks = action.payload.map((task: ITaskData) => {
          const {accuracy, task_id, task_type, user_id, model_name, state, filename} = task;

          return {task_id, user_id, task_type, accuracy, model_name, state, filename};
        });
        state.tasksData = tasks;
      });
  }
});

const {reducer, actions} = dashboard;
export const {} = actions;
export default reducer;
