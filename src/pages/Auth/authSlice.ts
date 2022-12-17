import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import {IFormLogin} from 'pages/interface';

export const authenticate = createAsyncThunk('auth/login', async (data: IFormLogin) => {
  const res = await authApi.login(data);
  return res;
});

const auth = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  }
});

const {reducer} = auth;
export default reducer;
