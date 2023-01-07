import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import usersApi from 'api/usersApi';
import {IProfile} from 'pages/model';

export const registerUser = createAsyncThunk('register/user', async (data: IProfile) => {
  const res = await usersApi.register(data);
  return res;
});

const register = createSlice({
  name: 'register',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {})
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
      });
  }
});

const {reducer} = register;
export default reducer;
