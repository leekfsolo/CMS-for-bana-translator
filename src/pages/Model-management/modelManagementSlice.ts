import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import modelApi from 'api/modelApi';
import moment from 'moment';
import {dataGetAllParams, IModelDisplay} from 'pages/model';
import {getRoundedFloat} from 'utils/helpers/getRoundedFloat';

const initialState: {
  modelData: IModelDisplay[];
  currentModels: any;
} = {
  modelData: [],
  currentModels: []
};

export const getAllModelData = createAsyncThunk('model/getAll', async (params: dataGetAllParams) => {
  const res = await modelApi.getAllFilterModels(params);
  return res;
});

export const deleteModelFile = createAsyncThunk('model/deleteById', async (data: {name: string}) => {
  const res = await modelApi.deleteById(data);
  return res;
});

export const activateModel = createAsyncThunk('model/activate', async (id: string) => {
  const res = await modelApi.activate(id);
  return res;
});

export const downloadModelFile = createAsyncThunk('model/downloadById', async (id: string) => {
  const res = await modelApi.downloadById(id);
  return res;
});

const transformModelData = (responseData: any): IModelDisplay[] => {
  return responseData.map((data: any) => {
    const {
      filename,
      epoch,
      model_type,
      region,
      createdDate,
      model_name,
      diff_loss,
      dur_loss,
      prior_loss,
      accuracy,
      size
    } = data;

    const lossData =
      model_type === 'tts'
        ? {
            diff_loss: getRoundedFloat(diff_loss),
            dur_loss: getRoundedFloat(dur_loss),
            prior_loss: getRoundedFloat(prior_loss)
          }
        : {bleu_score: getRoundedFloat(accuracy)};

    return {
      id: model_name,
      model_name,
      createdDate: createdDate ? moment(createdDate).format('DD/MM/YYYY') : null,
      region,
      filename,
      model_type,
      size: Math.round(size / (1024 * 1024)),
      epoch,
      ...lossData
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
