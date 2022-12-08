import ReduxTypes from "../ReduxTypes";

const initialState = {
  getUserListData: [],
  getUserListError: null,
};

const getUserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReduxTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        getUserListData: action.payload,
        getUserListError: null,
      };
    case ReduxTypes.GET_USER_LIST_FAILED:
      return {
        ...state,
        getUserListData: [],
        getUserListError: action.payload,
      };
    case ReduxTypes.GET_USER_LIST_PENDING:
      return {
        ...state,
        getUserListData: [],
        getUserListError: null,
      };
    case ReduxTypes.RESET_STORE:
      return {
        ...state,
        getUserListData: [],
        getUserListError: null,
      };
    default:
      return state;
  }
};

export default getUserListReducer;