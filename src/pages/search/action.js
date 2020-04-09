import { getTopHeadLines } from 'services';
import { actionCreator, actionTryCatchCreator } from 'utils';

export const HOME_ACTIONS = {
  UPDATE_SELECTED_NEWS: 'UPDATE_SELECTED_NEWS_HOME',
  UPDATE_SHOW_CTA: 'UPDATE_SHOW_CTA_HOME',
  UPDATE_CUR_PAGE: 'UPDATE_CUR_PAGE_HOME',
};

export const updateSelectedNews = (payload) => (dispatch) => {
  dispatch({
    type: HOME_ACTIONS.UPDATE_SELECTED_NEWS,
    payload,
  });
};

export const updateShowCTA = (payload) => (dispatch) => {
  dispatch({
    type: HOME_ACTIONS.UPDATE_SHOW_CTA,
    payload,
  });
};
export const updateCurPage = (payload) => (dispatch) => {
  dispatch({
    type: HOME_ACTIONS.UPDATE_CUR_PAGE,
    payload,
  });
};

export const GET_HEADLINES_NEWS = actionCreator('GET_HEADLINES_NEWS');
export const getHeadlines = (params) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_HEADLINES_NEWS.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_HEADLINES_NEWS.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    dispatch({
      type: GET_HEADLINES_NEWS.ERROR,
      payload: error,
    });
  };
  await actionTryCatchCreator({ service: getTopHeadLines(params), onPending, onSuccess, onError });
};

export const LOADMORE_HEADLINES_NEWS = actionCreator('LOADMORE_HEADLINES_NEWS');
export const loadmoreHeadlines = (params) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: LOADMORE_HEADLINES_NEWS.PENDING,
    });
  };
  const onSuccess = (data) => {
    updateCurPage(params.page)(dispatch);
    if (data.articles.length) {
      updateShowCTA(false)(dispatch);
    }
    dispatch({
      type: LOADMORE_HEADLINES_NEWS.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    dispatch({
      type: LOADMORE_HEADLINES_NEWS.ERROR,
      payload: error,
    });
  };
  await actionTryCatchCreator({ service: getTopHeadLines(params), onPending, onSuccess, onError });
};
