// import update from 'react-addons-update';
import { combineReducers } from 'redux';

import home from 'pages/home/reducer';
import search from 'pages/search/reducer';

// import { GLOBAL_ACTIONS } from './actions';

// const initialState = {
//   ui: {},
//   data: {},
// };

// const global = (state = initialState, action) => {
//   switch (action.type) {
//     case GLOBAL_ACTIONS.GLOBAL_LOADING: {
//       return update(state, {
//         ui: {
//           loading: { $set: !state.ui.loading },
//         },
//       });
//     }
//     case GLOBAL_ACTIONS.GLOBAL_RESET: {
//       return initialState;
//     }
//     default:
//       return state;
//   }
// };

export default combineReducers({
  // global,
  home,
  search,
});
