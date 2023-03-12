import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import queueApi from 'api/queueApi';
import Config from 'configuration';
import {ILoginState} from 'pages/interface';
import {ITaskUpload} from 'pages/model';

const initialState: ILoginState = {
  isUserExisted: false,
  name: ''
};

export const addTask = createAsyncThunk('dashboard/getAllTasks', async (data: ITaskUpload) => {
  const res = await queueApi.addTask(data);
  return res;
});

const training = createSlice({
  name: 'training',
  initialState,
  reducers: {},
  extraReducers: (builders) => {}
});

const {reducer, actions} = training;
export const {} = actions;
export default reducer;
