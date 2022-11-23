import {HTMLInputTypeAttribute} from 'react';

export interface ISidebarItem {
  label: string;
  src: string;
  icon?: React.ReactNode;
  subItems?: ISidebarItem[];
}

export interface ICForm {
  username?: string;
  fullname?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  accountRole?: string;
  currPassword?: string;
  newPassword?: string;
  confirmNewPassword?: '';
}

export interface ICFormInput {
  label: string;
  required: boolean;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  id: string;
  options?: string[];
  name: keyof ICForm;
}

export interface ICFormSection {
  title: string;
  items: ICFormInput[];
}
