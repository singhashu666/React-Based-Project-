import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};
export const viewPoll = createSlice({
  name: "viewPoll",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      (state.loading = true), (state.isError = false);
    },
    viewPollSuccessful: (state, action) => {
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
    viewPollReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const viewPollApi = (payload) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await Instance.post(
      `list_poll?id=${payload}`
    );
    if(response.data.error==0){
      dispatch(viewPollSuccessful(response.data));
    }
    else{
      dispatch(hasError(response.data));
    }

  } catch (error) {
    dispatch(hasError(error));
  }
};
export const { startLoading, hasError, viewPollSuccessful, viewPollResetReducer } =
  viewPoll.actions;
export default viewPoll.reducer;
