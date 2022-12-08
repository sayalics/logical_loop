import ReduxTypes from "../ReduxTypes";

export const getUserDetailsAction = (userId) => async (dispatch, getState) => {
  dispatch(getUserDetailsPending());
  const options = {
    method: 'GET',
  };
  
  fetch(`https://gorest.co.in/public/v1/users/${userId}`, options)
    .then(response => response.json())
    .then(response => {
        dispatch(getUserDetailsSuccess(response.data));
    })
    .catch(err => {
        dispatch(getUserDetailsFailure(response.message));
        console.error(err)});
};

export const getUserDetailsSuccess = (data) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_USER_DETAILS_SUCCESS,
    payload: data,
  });
};

export const getUserDetailsFailure = (error) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_USER_DETAILS_FAILED,
    payload: error,
  });
};

export const getUserDetailsPending = () => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_USER_DETAILS_PENDING,
  });
};