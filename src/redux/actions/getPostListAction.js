import ReduxTypes from "../ReduxTypes";

export const getPostListAction = (pageNo) => async (dispatch, getState) => {
  dispatch(getPostListPending());
  const options = {
    method: 'GET',
  };
  
  fetch(`https://gorest.co.in/public/v1/posts?page=${pageNo}`, options)
    .then(response => response.json())
    .then(response => {
        dispatch(getPostListSuccess(response));
    })
    .catch(err => {
        dispatch(getPostListFailure(response.message));
        console.error(err)});
};

export const getPostListSuccess = (data) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_POST_LIST_SUCCESS,
    payload: data,
  });
};

export const getPostListFailure = (error) => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_POST_LIST_FAILED,
    payload: error,
  });
};

export const getPostListPending = () => (dispatch) => {
  dispatch({
    type: ReduxTypes.GET_POST_LIST_PENDING,
  });
};