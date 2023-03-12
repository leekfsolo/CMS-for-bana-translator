import {RootState} from './store';

export const globalSelector = (state: RootState) => state.global;

export const authSelector = (state: RootState) => state.auth;

export const modelManagementSelector = (state: RootState) => state.modelManagement;

export const dataManagerSelector = (state: RootState) => state.dataManagement;

export const trainingSelector = (state: RootState) => state.training;

export const dashboardSelector = (state: RootState) => state.dashboard;
