import ReduxTypes from "../ReduxTypes";

const initialState = {
  getPostListData: [],
  getPostListError: null,
};

const getPostListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReduxTypes.GET_POST_LIST_SUCCESS:
      return {
        ...state,
        getPostListData: action.payload,
        getPostListError: null,
      };
    case ReduxTypes.GET_POST_LIST_FAILED:
      return {
        ...state,
        getPostListData: [],
        getPostListError: action.payload,
      };
    case ReduxTypes.GET_POST_LIST_PENDING:
      return {
        ...state,
        getPostListData: [],
        getPostListError: null,
      };
    case ReduxTypes.RESET_STORE:
      return {
        ...state,
        getPostListData: [],
        getPostListError: null,
      };
    default:
      return state;
  }
};

export default getPostListReducer;