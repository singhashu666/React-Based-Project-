import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../axios/BaseUrl";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const userDetails = createSlice({
  name: "userDetails",
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
    resetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export async function userApi() {
  dispatch(startLoading());
  try {
    let response = await Instance.get(`list_users`);
    if(response.data.error === 0){
        dispatch(loginSuccessful(response.data));
    }
    else{
        dispatch(hasError(response.data));
    }

  } catch (e) {
    dispatch(hasError(e));
    console.log(e, "sdffsf");
  }
}

export const { startLoading, getSuccess, loginSuccessful, hasError } =
  userDetails.actions;

export default userDetails.reducer;
