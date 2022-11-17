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
