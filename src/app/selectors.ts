import {RootState} from './store';

export const globalSelector = (state: RootState) => state.global;

export const authSelector = (state: RootState) => state.auth;
