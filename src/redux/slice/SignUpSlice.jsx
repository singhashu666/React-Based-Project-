import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};
export const signUp = createSlice({
  name: "signUp",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    loginSuccessful: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    signupResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});;
export const signUpapi = (payload) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await Instance.post(
      `add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`
    );
    if(response.data.error==0){

      dispatch(loginSuccessful(response.data));
    }
    else{
      dispatch(hasError(response.data));
    }

  } catch (error) {
    dispatch(hasError(error));
  }
};
export const {startLoading,hasError,loginSuccessful,signupResetReducer}=signUp.actions;
export default signUp.reducer
