import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import Config from 'configuration';
import {IFormLogin, ILoginState} from 'pages/interface';

const initialState: ILoginState = {
  isUserExisted: false,
  name: ''
};

export const authenticate = createAsyncThunk('auth/login', async (data: IFormLogin) => {
  const res = await authApi.login(data);
  return res;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const res = await authApi.logout();
  return res;
});

export const getMyInfo = createAsyncThunk('auth/getMyInfo', async () => {
  const res = await authApi.getMyInfo();
  return res;
});

export const refreshToken = createAsyncThunk('auth/refresh', async () => {
  const res = await authApi.refresh();
  return res;
});

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action: PayloadAction<any>) => {
        const {msg, ...loginState} = action.payload;
        state = loginState;
        localStorage.setItem(Config.storageKey.auth, JSON.stringify(loginState));
      })
      .addCase(logout.fulfilled, () => {
        localStorage.removeItem(Config.storageKey.auth);
      })
      .addCase(getMyInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.userInfo = action.payload;
        localStorage.setItem(Config.storageKey.auth, JSON.stringify(state));
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<any>) => {
        const {accessToken} = action.payload.data.user;
        const authJson = localStorage.getItem(Config.storageKey.auth);
        if (authJson) {
          const authValue = {...JSON.parse(authJson)};

          authValue.accessToken = accessToken;
          localStorage.setItem(Config.storageKey.auth, JSON.stringify(authValue));
        }
      });
  }
});

const {reducer, actions} = auth;
export const {saveAccessToken} = actions;
export default reducer;
