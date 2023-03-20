import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import queueApi from 'api/queueApi';
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

export const deleteTask = createAsyncThunk('dashboard/deletTask', async (id: string) => {
  const res = await queueApi.deleteTask(id);
  return res;
});

export const cancelTask = createAsyncThunk('dashboard/deletTask', async (id: string) => {
  const res = await queueApi.cancelTask(id);
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
      .addCase(getTotalTasks.fulfilled, (state, action: PayloadAction<any>) => {
        const tasks = action.payload.map(({task, user}: {task: ITaskData; user: any}) => {
          const {accuracy, task_id, task_type, model_name, state, filename} = task;

          return {
            id: task_id,
            username: user.username,
            model_name,
            filename,
            task_type,
            accuracy,
            status: STATUS[state]
          };
        });
        state.tasksData = tasks;
      });
  }
});

const {reducer} = dashboard;
export default reducer;
