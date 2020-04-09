import update from 'react-addons-update';
import { GET_HEADLINES_NEWS, HOME_ACTIONS, LOADMORE_HEADLINES_NEWS } from './action';

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
    case GET_HEADLINES_NEWS.PENDING:
    case LOADMORE_HEADLINES_NEWS.PENDING:
      return update(state, {
        ui: {
          isLoading: { $set: true },
        },
      });
    case GET_HEADLINES_NEWS.SUCCESS:
    case LOADMORE_HEADLINES_NEWS.SUCCESS:
      return update(state, {
        ui: {
          isLoading: { $set: false },
        },
        data: {
          articles: { $set: state.data.articles.concat(payload.articles || []) },
          totalResults: { $set: payload.totalResults },
        },
      });
    case GET_HEADLINES_NEWS.ERROR:
    case LOADMORE_HEADLINES_NEWS.ERROR:
      return update(state, {
        ui: {
          isLoading: { $set: false },
        },
      });
    case HOME_ACTIONS.UPDATE_SELECTED_NEWS:
      return update(state, {
        ui: {
          selectedNews: { $set: payload },
        },
      });
    case HOME_ACTIONS.UPDATE_SHOW_CTA:
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
