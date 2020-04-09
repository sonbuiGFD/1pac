import { request } from 'utils/request';

const API = {
  TOP_HEAD_LINES: '/v2/top-headlines',
};

export const getTopHeadLines = (params) =>
  request({
    url: API.TOP_HEAD_LINES,
    method: 'GET',
    params,
  });
