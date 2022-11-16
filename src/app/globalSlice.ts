import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Config from 'configuration';

const initGlobal = () => {
  // const global = localStorage.getItem(Config.storageKey.locale);
  // if (global) {
  //   return {locale: global, isLoading: false, isShowModalBackdrop: false};
  // }
  return {
    isLoading: false,
    isShowModalBackdrop: false,
    isShowSidebar: false
  };
};

const global = createSlice({
  name: 'global',
  initialState: initGlobal(),
  reducers: {
    handleBackdrop: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isShowModalBackdrop: action.payload
      };
    },
    handleSidebar: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isShowSidebar: action.payload
      };
    },
    handleLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload
      };
    }
  }
});

const {reducer, actions} = global;
export const {handleBackdrop, handleLoading, handleSidebar} = actions;
export default reducer;
