import ReduxTypes from "../ReduxTypes";

const initialState = {
  getPostDetailsData: [],
  getPostDetailsError: null,
};

const getPostDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReduxTypes.GET_POST_DETAILS_SUCCESS:
      return {
        ...state,
        getPostDetailsData: action.payload,
        getPostDetailsError: null,
      };
    case ReduxTypes.GET_POST_DETAILS_FAILED:
      return {
        ...state,
        getPostDetailsData: [],
        getPostDetailsError: action.payload,
      };
    case ReduxTypes.GET_POST_DETAILS_PENDING:
      return {
        ...state,
        getPostDetailsData: [],
        getPostDetailsError: null,
      };
    case ReduxTypes.RESET_STORE:
      return {
        ...state,
        getPostDetailsData: [],
        getPostDetailsError: null,
      };
    default:
      return state;
  }
};

export default getPostDetailsReducer;