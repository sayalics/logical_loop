import ReduxTypes from "../ReduxTypes";

const initialState = {
  updateUserDetailsData: [],
  updateUserDetailsError: null,
  updateIsLoading:false,
};

const updateUserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReduxTypes.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        updateUserDetailsData: action.payload,
        updateUserDetailsError: null,
        updateIsLoading:false,
      };
    case ReduxTypes.UPDATE_USER_DETAILS_FAILED:
      return {
        ...state,
        updateUserDetailsData: [],
        updateUserDetailsError: action.payload,
        updateIsLoading:false,
      };
    case ReduxTypes.UPDATE_USER_DETAILS_PENDING:
      return {
        ...state,
        updateUserDetailsData: [],
        updateUserDetailsError: null,
        updateIsLoading:true,
      };
    case ReduxTypes.RESET_STORE:
      return {
        ...state,
        updateUserDetailsData: [],
        updateUserDetailsError: null,
        updateIsLoading:false,
      };
    default:
      return state;
  }
};

export default updateUserDetailsReducer;