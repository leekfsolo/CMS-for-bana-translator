import environmentConfig from './environmentConfig';
import {storageKey} from './storageKey';

const isDevEnv = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const envConfig = isDevEnv ? environmentConfig.development : environmentConfig.production;

const Config = {
  isDevEnv,
  storageKey,
  apiConfig: {
    ...envConfig
  }
};

export const getUserServerUrl = (url: string) => Config.apiConfig.userServer.endPoint + url;
export const getDataServerUrl = (url: string) => Config.apiConfig.dataServer.endPoint + url;

export default Config;
