import update from 'react-addons-update';
import { GET_NEWS, SEARCH_ACTIONS, LOADMORE_NEWS } from './action';

const initialState = {
  ui: {
    isLoading: false,
    selectedNews: {},
    isShowCTA: true,
    curPage: 1,
  },
  data: {
    totalResults: 0,
    articles: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEWS.PENDING:
    case LOADMORE_NEWS.PENDING:
      return update(state, {
        ui: {
          isLoading: { $set: true },
        },
      });
    case GET_NEWS.SUCCESS:
      return update(state, {
        ui: {
          isLoading: { $set: false },
        },
        data: {
          articles: { $set: payload.articles || [] },
          totalResults: { $set: payload.totalResults },
        },
      });
    case LOADMORE_NEWS.SUCCESS:
      return update(state, {
        ui: {
          isLoading: { $set: false },
        },
        data: {
          articles: { $set: state.data.articles.concat(payload.articles || []) },
          totalResults: { $set: payload.totalResults },
        },
      });
    case GET_NEWS.ERROR:
    case LOADMORE_NEWS.ERROR:
      return update(state, {
        ui: {
          isLoading: { $set: false },
        },
      });
    case SEARCH_ACTIONS.UPDATE_SELECTED_NEWS:
      return update(state, {
        ui: {
          selectedNews: { $set: payload },
        },
      });
    case SEARCH_ACTIONS.UPDATE_SHOW_CTA:
      return update(state, {
        ui: {
          isShowCTA: { $set: payload },
        },
      });

    default:
      return state;
  }
};

export default reducer;
