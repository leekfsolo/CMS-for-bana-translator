import {ActionType} from 'configuration/enum';
import {HTMLInputTypeAttribute, ReactNode} from 'react';
import {SelectDataType} from 'utils/base/model';

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
  options?: SelectDataType[];
  name: keyof ICForm;
}

export interface ICFormSection {
  title: string;
  items: ICFormInput[];
}

export interface IRowAction {
  title: string;
  handle: (data: IHandleActionParams) => Promise<void>;
  icon?: ReactNode;
  actionType: ActionType;
}

export interface IHandleActionParams {
  type: ActionType;
  payload: string[];
}
