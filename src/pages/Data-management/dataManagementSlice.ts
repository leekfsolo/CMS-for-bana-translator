import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import dataApi from 'api/dataApi';
import Config from 'configuration';
import {create} from 'domain';
import {IData, IDataDisplay} from 'pages/model';

const initialState: {
  dataData: IDataDisplay[];
} = {
  dataData: []
};

export const getAllDataData = createAsyncThunk('data/getAll', async (_) => {
  const res = await dataApi.getAll();
  return res;
});

const transformDataData = (responseData: any): IDataDisplay[] => {
  return responseData.map((data: IData) => {
    const {version, createdDate, region, nosample, type, filename} = data;

    return {
      version,
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
    builders.addCase(getAllDataData.fulfilled, (state, action: PayloadAction<any>) => {
      const responseData = action.payload.datas;
      const displayData = transformDataData(responseData);
      state.dataData = displayData;
    });
  }
});

const {reducer, actions} = dataManagement;
export const {} = actions;
export default reducer;
