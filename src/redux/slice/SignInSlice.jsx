import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};
export const signIn = createSlice({
  name: "signIn",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      (state.loading = true), (state.isError = false);
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
    loginResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const signInApi = (payload) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await Instance.post(
      `login?username=${payload.username}&password=${payload.password}`
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
export const { startLoading, hasError, loginSuccessful, loginResetReducer } =
  signIn.actions;
export default signIn.reducer;
