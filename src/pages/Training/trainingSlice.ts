import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import dataApi from 'api/dataApi';
import modelApi from 'api/modelApi';
import queueApi from 'api/queueApi';
import {dataGetAllParams, ITaskUpload} from 'pages/model';

const initialState: {dataDetail: any[]; modelDetail: any[]} = {
  dataDetail: [],
  modelDetail: []
};

export const addTask = createAsyncThunk('dashboard/getAllTasks', async (data: ITaskUpload) => {
  const res = await queueApi.addTask(data);
  return res;
});

export const getAllDataDetail = createAsyncThunk('data/getAllData', async (params: dataGetAllParams) => {
  const res = await dataApi.getAll(params);
  return res;
});

export const getAllModelDetail = createAsyncThunk('model/getAllModel', async (params: dataGetAllParams) => {
  const res = await modelApi.getAllFilterModels(params);
  return res;
});

const training = createSlice({
  name: 'training',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllDataDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.dataDetail = action.payload.datas;
      })
      .addCase(getAllModelDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.modelDetail = action.payload;
      });
  }
});

const {reducer} = training;
export default reducer;
