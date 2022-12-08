import ReduxTypes from "../ReduxTypes";

export const getPostDetailsAction = (postId) => async (dispatch, getState) => {
  dispatch(getPostDetailsPending());
  const options = {
    method: 'GET',
  };
  
  fetch(`https://gorest.co.in/public/v1/posts/${postId}`, options)
    .then(response => response.json())
    .then(response => {
        dispatch(getPostDetailsSuccess(response.data));
    })
    .catch(err => {
        dispatch(getPostDetailsFailure(response.message));
        console.error(err)});
};

export const getPostDetailsSuccess = (data) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_POST_DETAILS_SUCCESS,
    payload: data,
  });
};

export const getPostDetailsFailure = (error) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_POST_DETAILS_FAILED,
    payload: error,
  });
};

export const getPostDetailsPending = () => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_POST_DETAILS_PENDING,
  });
};