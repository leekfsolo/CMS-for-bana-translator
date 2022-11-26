import {HTMLInputTypeAttribute} from 'react';
export interface StaffData {
  version: string;
  createdDate: string;
  region: string;
  quantity: number;
}

export interface StaffHeadCell {
  disablePadding: boolean;
  id: keyof StaffData;
  label: string;
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
