import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Config from 'configuration';
import {ILoginState} from 'pages/interface';

const initialState: ILoginState = {
  isUserExisted: false,
  name: ''
};

const dataManagement = createSlice({
  name: 'dataManagement',
  initialState,
  reducers: {},
  extraReducers: (builders) => {}
});

const {reducer, actions} = dataManagement;
export const {} = actions;
export default reducer;
