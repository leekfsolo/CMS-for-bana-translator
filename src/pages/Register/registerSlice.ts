import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import registerApi from 'api/registerApi';
import {IProfile} from 'pages/interface';

export const registerUser = createAsyncThunk('register/user', async (data: IProfile) => {
  const res = await registerApi.register(data);
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
