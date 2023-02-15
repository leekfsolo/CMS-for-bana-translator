import {HTMLInputTypeAttribute} from 'react';
import {IProfile} from './model';

type alignPadding = 'left' | 'right' | 'center';

export interface TableHeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  align: alignPadding;
}

export interface IDataHead {
  version: string;
  createdDate: string;
  region: string;
  quantity: number;
}

export interface IModelHead {
  version: string;
  dataVersion: string;
  createdDate: string;
  region: string;
  accuracy: number;
  epoch: number;
}

export interface ITrainingHistory {
  user: string;
  dataVersion: string;
  dataType: string;
  region: string;
  time: string;
  status: string;
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

export interface IFormLogin {
  username: string;
  password: string;
}

export interface IFormRegister extends IProfile {
  confirmPassword: string;
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

export interface ILoginState {
  isUserExisted: boolean;
  name: string;
  accessToken?: string;
  userInfo?: IProfile;
}
