import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import modelApi from 'api/modelApi';
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

const modelManagement = createSlice({
  name: 'modelManagement',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(getAllModelData.fulfilled, (state, action: PayloadAction<any>) => {
      const responseData = action.payload;
      const displayData: IModelDisplay[] = responseData.map((data: IModel) => {
        const {version, filename, epoch, model_type, region, createdDate} = data;

        return {
          version,
          filename,
          createdDate,
          region,
          model_type,
          epoch
        };
      });

      state.modelData = displayData;
    });
  }
});

const {reducer, actions} = modelManagement;
export const {} = actions;
export default reducer;
