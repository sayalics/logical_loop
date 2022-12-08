import ReduxTypes from "../ReduxTypes";

export const getUserListAction = (pageNo) => async (dispatch, getState) => {
  dispatch(getUserListPending());
  const options = {
    method: 'GET',
  };
  
  fetch(`https://gorest.co.in/public/v1/users?page=${pageNo}`, options)
    .then(response => response.json())
    .then(response => {
        dispatch(getUserListSuccess(response));
    })
    .catch(err => {
        dispatch(getUserListFailure(response.message));
        console.error(err)});
};

export const getUserListSuccess = (data) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_USER_LIST_SUCCESS,
    payload: data,
  });
};

export const getUserListFailure = (error) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_USER_LIST_FAILED,
    payload: error,
  });
};

export const getUserListPending = () => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_USER_LIST_PENDING,
  });
};