import { request } from 'utils/request';

const API = {
  TOP_HEAD_LINES: '/v2/top-headlines',
  EVERYTHING: '/v2/everything',
};

export const getTopHeadLines = (params) =>
  request({
    url: API.TOP_HEAD_LINES,
    method: 'GET',
    params,
  });

export const getAll = (params) =>
  request({
    url: API.EVERYTHING,
    method: 'GET',
    params,
  });
