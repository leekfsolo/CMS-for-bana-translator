import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import usersApi from 'api/usersApi';
import {IChangePassword} from 'pages/model';

const initialState = {};

export const changePassword = createAsyncThunk('model/getAll', async (data: IChangePassword) => {
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
