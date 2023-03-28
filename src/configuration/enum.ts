export enum PageUrl {
  HOME = 'home',
  LOGIN = 'login',
  CREATE_ACCOUNT = 'create-account',
  PROFILE = 'profile',
  DASHBOARD = 'dashboard',
  MODEL_MANAGEMENT = 'model-management',
  DATA_MANAGEMENT = 'data-management',
  TRAINING = 'training',
  ALL = '*',
  BASEURL = 'bana-model'
}

export enum ActionType {
  DELETE = 'delete',
  CANCEL = 'cancel',
  LOG = 'log',
  ACTIVATE = 'activate',
  DOWNLOAD = 'download',
  EDIT = 'edit'
}

export enum DownloadState {
  NONE = 'none',
  GET_FILE_FROM_SERVER = 'get file from server',
  DOWNLOADING = 'downloading',
  DOWNLOADED = 'downloaded',
  ERROR = 'error'
}
