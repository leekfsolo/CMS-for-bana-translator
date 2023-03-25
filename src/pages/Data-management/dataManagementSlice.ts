import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import dataApi from 'api/dataApi';
import {dataGetAllParams, IDataDisplay} from 'pages/model';

const initialState: {
  dataData: IDataDisplay[];
} = {
  dataData: []
};

export const getAllDataData = createAsyncThunk('data/getAll', async (params: dataGetAllParams) => {
  const res = await dataApi.getAll(params);
  return res;
});

export const uploadDataFile = createAsyncThunk('data/upload', async (data: FormData) => {
  const res = await dataApi.add(data);
  return res;
});

export const deleteDataFile = createAsyncThunk('data/deleteById', async (data: string) => {
  const res = await dataApi.deleteById(data);
  return res;
});

const transformDataData = (responseData: any): IDataDisplay[] => {
  return responseData.map((data: any) => {
    const {version, createdDate, region, nosample, type, filename} = data;

    return {
      id: version,
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
