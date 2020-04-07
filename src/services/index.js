import { request } from 'utils/request';

const API = {
  TOP_HEAD_LINES: '/v2/top-headlines',
};

export const claimCommonPools = (
  data = {
    caseId: 'string',
  },
) =>
  request({
    url: API.TOP_HEAD_LINES,
    method: 'POST',
    data,
  });
