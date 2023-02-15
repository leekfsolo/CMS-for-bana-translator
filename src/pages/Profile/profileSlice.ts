import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import usersApi from 'api/usersApi';
import Config from 'configuration';
import {ILoginState} from 'pages/interface';
import {IProfile} from 'pages/model';

const initialState = {};

export const changePassword = createAsyncThunk('model/getAll', async (data: IProfile) => {
  const res = await usersApi.changePassword(data);
  return res;
});

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(changePassword.fulfilled, (state, action: PayloadAction<any>) => {
      console.log(action.payload);
    });
  }
});

const {reducer, actions} = profile;
export const {} = actions;
export default reducer;
