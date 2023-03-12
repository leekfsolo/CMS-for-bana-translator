import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import {AxiosError} from 'axios';
import Config from 'configuration';
import {IFormLogin, ILoginState} from 'pages/interface';

const initialState = (): ILoginState => {
  const auth = localStorage.getItem(Config.storageKey.auth);
  if (auth) {
    return {...JSON.parse(auth)};
  }

  return {
    isUserExisted: false,
    name: ''
  };
};

export const authenticate = createAsyncThunk('auth/login', async (data: IFormLogin) => {
  const res = await authApi.login(data);
  return res;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const res = await authApi.logout();
  return res;
});

export const getMyInfo = createAsyncThunk('auth/getMyInfo', async (_, {rejectWithValue}) => {
  try {
    const res = await authApi.getMyInfo();
    return res;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (!err.response) {
        throw err;
      }

      rejectWithValue(err.response.data);
    }
  }
});

export const refreshToken = createAsyncThunk('auth/refresh', async () => {
  const res = await authApi.refresh();
  return res;
});

const auth = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action: PayloadAction<any>) => {
        const {msg, success, ...loginState} = action.payload;
        localStorage.setItem(Config.storageKey.auth, JSON.stringify(loginState));
        return loginState;
      })
      .addCase(logout.fulfilled, () => {
        localStorage.removeItem(Config.storageKey.auth);
      })
      .addCase(getMyInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.userInfo = action.payload;
        localStorage.setItem(Config.storageKey.auth, JSON.stringify(state));
      })
      .addCase(getMyInfo.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<any>) => {
        const {accessToken} = action.payload.data.user;
        const authJson = localStorage.getItem(Config.storageKey.auth);
        if (authJson) {
          const authValue = {...JSON.parse(authJson)};

          authValue.accessToken = accessToken;
          localStorage.setItem(Config.storageKey.auth, JSON.stringify(authValue));
          return authValue;
        }
      });
  }
});

const {reducer, actions} = auth;
export const {saveAccessToken} = actions;
export default reducer;
