import ReduxTypes from "../ReduxTypes";

const initialState = {
  getUserDetailsData: [],
  getUserDetailsError: null,
};

const getUserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReduxTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        getUserDetailsData: action.payload,
        getUserDetailsError: null,
      };
    case ReduxTypes.GET_USER_DETAILS_FAILED:
      return {
        ...state,
        getUserDetailsData: [],
        getUserDetailsError: action.payload,
      };
    case ReduxTypes.GET_USER_DETAILS_PENDING:
      return {
        ...state,
        getUserDetailsData: [],
        getUserDetailsError: null,
      };
    case ReduxTypes.RESET_STORE:
      return {
        ...state,
        getUserDetailsData: [],
        getUserDetailsError: null,
      };
    default:
      return state;
  }
};

export default getUserDetailsReducer;