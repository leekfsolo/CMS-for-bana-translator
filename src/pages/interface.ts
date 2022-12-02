import {HTMLInputTypeAttribute} from 'react';
export interface StaffData {
  version: string;
  createdDate: string;
  region: string;
  quantity: number;
}

export interface StaffHeadCell {
  disablePadding: boolean;
  id: keyof StaffData | keyof StaffModel;
  label: string;
  align: 'left' | 'right';
}

export interface StaffModel {
  version: string;
  dataVersion: string;
  createdDate: string;
  region: string;
  accuracy: number;
  epoch: number;
}

export interface IRegisterInput {
  label: string;
  required: boolean;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  id: string;
  options?: string[];
  name: keyof IFormRegister;
}

export interface IRegisterSection {
  title: string;
  items: IRegisterInput[];
}

export interface IFormRegister {
  username: string;
  fullname: string;
  phone: string;
  password: string;
  confirmPassword: string;
  accountRole: string;
}

export interface IFormLogin {
  username: string;
  password: string;
}

export interface IProfile {
  fullname: string;
  phone: string;
  accountRole: string;
  username: string;
  password: string;
}

export interface IProfileInfo {
  key: string;
  value: string;
}

export interface IProfileSection {
  title: string;
  items: IProfileInfo[];
}

export interface IProfileFormTitle {
  currPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IProfileFormInput {
  label: string;
  required: boolean;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  id: string;
  options?: string[];
  name: keyof IProfileFormTitle;
}

export interface IProfileFormSection {
  title: string;
  items: IProfileFormInput[];
}

export interface ITrainingOptionSelect {
  title: string;
  options: string[];
  type: keyof ITrainingOptionValues;
}

export interface ITrainingOptionValues {
  dataset: string;
  model: string;
  region: string;
  checkpoint: string;
}
