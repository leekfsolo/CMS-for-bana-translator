import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import modelApi from 'api/modelApi';
import queueApi from 'api/queueApi';
import {ITaskUpload} from 'pages/model';

const initialState: {modelData: any[]} = {
  modelData: []
};

export const addTask = createAsyncThunk('dashboard/getAllTasks', async (data: ITaskUpload) => {
  const res = await queueApi.addTask(data);
  return res;
});

export const getAllNMTModelData = createAsyncThunk('training/getAllNMT', async (_) => {
  const res = await modelApi.getAllNMT();
  return res;
});

export const getAllTTSModelData = createAsyncThunk('training/getAllTTS', async (_) => {
  const res = await modelApi.getAllTTS();
  return res;
});

const training = createSlice({
  name: 'training',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllNMTModelData.fulfilled, (state, action: PayloadAction<any>) => {
        state.modelData = action.payload;
      })
      .addCase(getAllTTSModelData.fulfilled, (state, action: PayloadAction<any>) => {
        state.modelData = action.payload;
      });
  }
});

const {reducer} = training;
export default reducer;
