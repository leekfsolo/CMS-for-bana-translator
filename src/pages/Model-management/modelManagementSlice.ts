import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import modelApi from 'api/modelApi';
import moment from 'moment';
import {dataGetAllParams, IModel, IModelDisplay} from 'pages/model';

const initialState: {
  modelData: IModelDisplay[];
} = {
  modelData: []
};

export const getAllModelData = createAsyncThunk('model/getAll', async (params: dataGetAllParams) => {
  const res = await modelApi.getAllFilterModels(params);
  return res;
});

const transformModelData = (responseData: any): IModelDisplay[] => {
  return responseData.map((data: IModel) => {
    const {version, filename, epoch, model_type, region, createdDate, model_name} = data;

    return {
      id: version,
      model_name,
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
    builders.addCase(getAllModelData.fulfilled, (state, action: PayloadAction<any>) => {
      const responseData = action.payload;
      const displayData = transformModelData(responseData);
      state.modelData = displayData;
    });
  }
});

const {reducer} = modelManagement;
export default reducer;
