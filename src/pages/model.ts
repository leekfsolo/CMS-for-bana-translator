export interface IProfile {
  fullname: string;
  phone: string;
  accountRole: string;
  username: string;
  password: string;
}

export interface IData {
  version: string;
  createdDate: string;
  region: string;
  quantity: number;
}

export interface IModel {
  version: string;
  createdDate: string;
  region: string;
  accuracy: number;
  epoch: number;
  size: string;
}
