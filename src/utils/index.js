import { toast } from 'react-toastify';

export const storeData = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log('storeData', error);
  }
};

export const storeObject = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('storeData', error);
  }
};

export const getData = (key) => {
  let res = '';
  try {
    res = localStorage.getItem(key);
  } catch (error) {
    console.log('getData', error);
  }
  return res;
};

export const getObject = (key) => {
  let res = {};
  try {
    res = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log('getData', error);
  }
  return res;
};

export const actionCreator = (actionName, extraField = []) => {
  const actionType = {
    NAME: actionName,
    PENDING: `${actionName}_PENDING`,
    SUCCESS: `${actionName}_SUCCESS`,
    ERROR: `${actionName}_ERROR`,
  };
  extraField.forEach((field) => {
    actionType[field] = `${actionName}_${field}`;
  });

  return actionType;
};

export const actionTryCatchCreator = async ({ service, onPending, onSuccess, onError, ignoreError }) => {
  const isIgnoreError = ignoreError || false;
  const env = process.env.REACT_APP_BUILD || 'development';
  try {
    if (onPending) onPending();
    const { status, data } = await service;
    if (status === 200 && data.status === 'ok') {
      if (onSuccess) onSuccess(data);
    } else if (env === 'development') {
      throw String(`${data.status} with code ${data.code}`);
    } else throw String(data.message);
  } catch (error) {
    if (onError) onError(error);
    if (isIgnoreError) {
      return;
    }
    if (typeof error === 'object') {
      toast.error(`${error.message}`);
    } else {
      toast.error(error);
    }
    throw error;
  }
};

export const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
};

export const trimHtml = (str) => {
  return str.replace(/(<([^>]+)>)/gi, '');
};

export const truncate = (str, maxLength = 50) => {
  if (!str) {
    return '';
  }
  const dots = str.length > maxLength ? '...' : '';
  return str.substring(0, maxLength) + dots;
};

export const formatDate = (d) => {
  if (!d) {
    return '';
  }

  const date = new Date(d);
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
};
