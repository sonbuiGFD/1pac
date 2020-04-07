import axios from 'axios';
import { hostConfigs } from 'constants/index';
import { getData } from 'utils';

export const request = async ({
  host = '',
  url = '',
  method = 'GET',
  params = {},
  data = {},
  headers = {},
  _token,
}) => {
  const token = _token || (await getData('token')) || hostConfigs.development.defautToken;
  const hostEnv = process.env.REACT_APP_API || hostConfigs.development.HostAPI;
  const GRANTTYPE = process.env.REACT_APP_GRANTTYPE || hostConfigs.development.grantType;

  try {
    const res = await axios({
      url: `${host || hostEnv}${url}`,
      method,
      data,
      params,
      headers: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        // 'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, FunctionName',
        // 'Cache-Control': 'no-cache, no-store',
        // Pragma: 'no-cache',
        Authorization: `${GRANTTYPE} ${token}`,
        ...headers,
      },
    });
    return res;
  } catch (error) {
    console.log('TCL: error', error);
    throw error;
  }
};

export default request;
