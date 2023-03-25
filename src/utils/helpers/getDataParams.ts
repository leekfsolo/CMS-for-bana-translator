import {dataGetAllParams} from 'pages/model';

export const getDataParams = (region: string, type: string) => {
  const params: dataGetAllParams = {};

  if (region !== 'defaultValue') {
    Object.assign(params, {region});
  }

  if (type !== 'defaultValue') {
    Object.assign(params, {type});
  }

  return params;
};
