import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import modelApi from 'api/modelApi';
import moment from 'moment';
import {IModel, IModelDisplay} from 'pages/model';

const initialState: {
  modelData: IModelDisplay[];
} = {
  modelData: []
};

export const getAllModelData = createAsyncThunk('model/getAll', async (_) => {
  const res = await modelApi.getAll();
  return res;
});

export const getAllNMTModelData = createAsyncThunk('model/getAllNMT', async (_) => {
  const res = await modelApi.getAllNMT();
  return res;
});

export const getAllTTSModelData = createAsyncThunk('model/getAllTTS', async (_) => {
  const res = await modelApi.getAllTTS();
  return res;
});

const transformModelData = (responseData: any): IModelDisplay[] => {
  return responseData.map((data: IModel) => {
    const {version, filename, epoch, model_type, region, createdDate} = data;

    return {
      id: version,
      createdDate: createdDate ? moment(createdDate).format('DD/MM/YYYY') : null,
      region,
      filename,
      model_type,
      epoch
    };
  });
};

const modelManagement = createSlice({
  name: 'modelManagement',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllModelData.fulfilled, (state, action: PayloadAction<any>) => {
        const responseData = action.payload;
        const displayData = transformModelData(responseData);
        state.modelData = displayData;
      })
      .addCase(getAllNMTModelData.fulfilled, (state, action: PayloadAction<any>) => {
        const responseData = action.payload;
        const displayData = transformModelData(responseData);
        state.modelData = displayData;
      })
      .addCase(getAllTTSModelData.fulfilled, (state, action: PayloadAction<any>) => {
        const responseData = action.payload;
        const displayData = transformModelData(responseData);
        state.modelData = displayData;
      });
  }
});

const {reducer} = modelManagement;
export default reducer;
