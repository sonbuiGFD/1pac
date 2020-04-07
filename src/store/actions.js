import { actionCreator, actionTryCatchCreator } from 'utils';

export const GLOBAL_ACTIONS = {
  GLOBAL_LOADING: 'GLOBAL_LOADING',
  GLOBAL_RESET: 'GLOBAL_RESET',
};

export const toggleMenu = () => (dispatch) => {
  dispatch({
    type: GLOBAL_ACTIONS.TOGGLE_MENU,
  });
};

export const GLOBAL_LOAD_MASTER_CODE = actionCreator('GLOBAL_LOAD_MASTER_CODE');
export const getMastercodeAction = () => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GLOBAL_LOAD_MASTER_CODE.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GLOBAL_LOAD_MASTER_CODE.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    dispatch({
      type: GLOBAL_LOAD_MASTER_CODE.ERROR,
      payload: error,
    });
  };
  await actionTryCatchCreator({
    service: () => {},
    onPending,
    onSuccess,
    onError,
  });
};
