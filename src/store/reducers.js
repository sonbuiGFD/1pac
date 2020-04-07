import update from 'react-addons-update';
import { combineReducers } from 'redux';

// import { getObject, getData } from 'utils';

import { GLOBAL_ACTIONS } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_ACTIONS.GLOBAL_LOADING: {
      return update(state, {
        ui: {
          loading: { $set: !state.ui.loading },
        },
      });
    }
    case GLOBAL_ACTIONS.GLOBAL_RESET: {
      return initialState;
    }

    default:
      return state;
  }
};

export default combineReducers({
  global,
});
