import axios from 'axios';
import { hostConfigs } from 'constants/index';
import { getData } from 'utils';

delete axios.defaults.headers.common['Content-Type'];
delete axios.defaults.headers.common['content-type'];

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
    return await axios({
      url: `${host || hostEnv}${url}`,
      method,
      data,
      params,
      transformRequest: [
        function (data, headers) {
          delete headers.common.Accept;
          return data;
        },
      ],
      headers: {
        Accept: '*/*',
        // 'Access-Control-Allow-Origin': '*/*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, pragma',
        // 'Cache-Control': 'no-cache, no-store',
        // pragma: 'no-cache',
        // 'Content-Type': null,
        Authorization: `${GRANTTYPE} ${token}`,
        ...headers,
      },
    });
  } catch (error) {
    console.log('TCL: error', error);
    throw error;
  }
};

export default request;
