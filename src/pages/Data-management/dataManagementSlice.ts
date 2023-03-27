import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import dataApi from 'api/dataApi';
import {dataGetAllParams, IData, IDataDisplay} from 'pages/model';

const initialState: {
  dataData: IDataDisplay[];
  detailData: Partial<IData>;
} = {
  dataData: [],
  detailData: {}
};

export const getAllDataData = createAsyncThunk('data/getAll', async (params: dataGetAllParams) => {
  const res = await dataApi.getAll(params);
  return res;
});

export const uploadDataFile = createAsyncThunk('data/upload', async (data: FormData) => {
  const res = await dataApi.add(data);
  return res;
});

export const getDataFile = createAsyncThunk('data/getById', async (data: string) => {
  const res = await dataApi.getById(data);
  return res;
});

export const deleteDataFile = createAsyncThunk('data/deleteById', async (data: string) => {
  const res = await dataApi.deleteById(data);
  return res;
});

export const updateDataFile = createAsyncThunk('data/updateById', async (data: Partial<IData>) => {
  const res = await dataApi.updateById(data);
  return res;
});

export const downloadDataFile = createAsyncThunk('data/downloadById', async (data: string) => {
  const res = await dataApi.downloadById(data);
  return res;
});

const transformDataData = (responseData: any): IDataDisplay[] => {
  return responseData.map((data: any) => {
    const {createdDate, region, nosample, type, filename} = data;

    return {
      id: filename,
      filename,
      createdDate,
      region,
      nosample,
      type
    };
  });
};

const dataManagement = createSlice({
  name: 'dataManagement',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllDataData.fulfilled, (state, action: PayloadAction<any>) => {
        const responseData = action.payload.datas;
        const displayData = transformDataData(responseData);
        state.dataData = displayData;
      })
      .addCase(uploadDataFile.fulfilled, (state, action: PayloadAction<any>) => {
        const responseData = action.payload.datas;
        const displayData = transformDataData(responseData);
        state.dataData = displayData;
      });
  }
});

const {reducer, actions} = dataManagement;
export const {} = actions;
export default reducer;
