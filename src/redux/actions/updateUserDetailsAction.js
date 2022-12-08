import { EventRegister } from "react-native-event-listeners";
import NavigationService from "../../navigation/NavigationService";
import { emitConfig } from "../../screens/Home";
import ReduxTypes from "../ReduxTypes";

export const updateUserDetailsAction = (userId, name, email, gender) => async (dispatch, getState) => {
  dispatch(updateUserDetailsPending());
  const form = new FormData();
            form.append("name", name);
            form.append("email", email);
            form.append("gender", gender.toLowerCase());

            const options = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer 05550bf9b925f7fa35aab05d888ef2824e4ae7b95defdde089e1ff0c51a120cc'
            }
            };

            options.body = form;

            fetch(`https://gorest.co.in/public/v1/users/${userId}`, options)
            .then(response => response.json())
            .then(response => {
                dispatch(updateUserDetailsSuccess(response.data));
                EventRegister.emit(emitConfig.API_CALLING, "Api called!!!")
                // NavigationService.navigate("Home");
            })
            .catch(err => [
                console.error(err), 
                dispatch(updateUserDetailsFailure(response.message))
            ]);
};

export const updateUserDetailsSuccess = (data) => (dispatch) => {
  dispatch({
    type: ReduxTypes.UPDATE_USER_DETAILS_SUCCESS,
    payload: data,
  });
};

export const updateUserDetailsFailure = (error) => (dispatch) => {
  dispatch({
    type: ReduxTypes.UPDATE_USER_DETAILS_FAILED,
    payload: error,
  });
};

export const updateUserDetailsPending = () => (dispatch) => {
  dispatch({
    type: ReduxTypes.UPDATE_USER_DETAILS_PENDING,
  });
};