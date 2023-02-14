import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Config from 'configuration';
import {ILoginState} from 'pages/interface';

const initialState: ILoginState = {
  isUserExisted: false,
  name: ''
};

const training = createSlice({
  name: 'training',
  initialState,
  reducers: {},
  extraReducers: (builders) => {}
});

const {reducer, actions} = training;
export const {} = actions;
export default reducer;
