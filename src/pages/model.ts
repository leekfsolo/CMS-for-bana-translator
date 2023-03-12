export interface IChangePassword {
  password: string;
  repassword: string;
}

export interface IProfile {
  fullname: string;
  phone: string;
  accountRole: string;
  username: string;
  password: string;
}

export interface IDataDisplay {
  version: string;
  region: string;
  nosample: number;
  type?: string;
}

export interface IData extends IDataDisplay {
  filename?: string;
  training_file?: any;
}

export interface IModelDisplay {
  createdDate?: string;
  epoch: number;
  filename?: string;
  model_name: string;
  model_type: string;
  region: string;
  version: number;
}
export interface IModel extends IModelDisplay {
  accuracy?: number;
  ckpt_file: string;
  diff_loss?: number;
  dur_loss?: number;
  prior_loss?: number;
}
