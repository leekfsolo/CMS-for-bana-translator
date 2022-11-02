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

export default Config;
