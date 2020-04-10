import { getAll } from 'services';
import { actionCreator, actionTryCatchCreator } from 'utils';

export const SEARCH_ACTIONS = {
  UPDATE_SELECTED_NEWS: 'UPDATE_SELECTED_NEWS_SEARCH',
  UPDATE_SHOW_CTA: 'UPDATE_SHOW_CTA_SEARCH',
  UPDATE_CUR_PAGE: 'UPDATE_CUR_PAGE_SEARCH',
};

export const updateSelectedNews = (payload) => (dispatch) => {
  dispatch({
    type: SEARCH_ACTIONS.UPDATE_SELECTED_NEWS,
    payload,
  });
};

export const updateShowCTA = (payload) => (dispatch) => {
  dispatch({
    type: SEARCH_ACTIONS.UPDATE_SHOW_CTA,
    payload,
  });
};
export const updateCurPage = (payload) => (dispatch) => {
  dispatch({
    type: SEARCH_ACTIONS.UPDATE_CUR_PAGE,
    payload,
  });
};

export const GET_NEWS = actionCreator('GET_NEWS');
export const getNews = (params) => async (dispatch) => {
  updateShowCTA(true)(dispatch);
  updateCurPage(1)(dispatch);
  const onPending = () => {
    dispatch({
      type: GET_NEWS.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_NEWS.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    dispatch({
      type: GET_NEWS.ERROR,
      payload: error,
    });
  };
  await actionTryCatchCreator({ service: getAll(params), onPending, onSuccess, onError });
};

export const LOADMORE_NEWS = actionCreator('LOADMORE_NEWS');
export const loadmoreNews = (params) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: LOADMORE_NEWS.PENDING,
    });
  };
  const onSuccess = (data) => {
    updateCurPage(params.page)(dispatch);
    if (data.articles.length) {
      updateShowCTA(false)(dispatch);
    }
    dispatch({
      type: LOADMORE_NEWS.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    dispatch({
      type: LOADMORE_NEWS.ERROR,
      payload: error,
    });
  };
  await actionTryCatchCreator({ service: getAll(params), onPending, onSuccess, onError });
};
