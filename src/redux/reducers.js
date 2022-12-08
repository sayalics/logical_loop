import { combineReducers } from "redux";

import getUserListReducer from "./reducers/getUserListReducer";
import getPostListReducer from "./reducers/getPostListReducer";
import getPostDetailsReducer from "./reducers/getPostDetailsReducer";
import getUserDetailsReducer from "./reducers/getUserDetailsReducer";
import updateUserDetailsReducer from "./reducers/updateUserDetailsReducer";

export default combineReducers({
    getUserListReducer,
    getPostListReducer,
    getPostDetailsReducer,
    getUserDetailsReducer,
    updateUserDetailsReducer,
});