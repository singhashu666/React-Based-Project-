import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
import { dispatch } from "../store/store";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const DeletePoll = createSlice({
  name: "DeletePoll",
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
    deleteResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const DeletePollApi = (payload) => async () => {
  dispatch(DeletePoll.actions.startLoading());
  try {
    let response = await Instance.delete(`delete_poll?id=${payload}`);
    dispatch(DeletePoll.actions.loginSuccessful(response.data));
  } catch (e) {
    dispatch(DeletePoll.actions.hasError(e));
  }
};

export const { startLoading, loginSuccessful, hasError, deleteResetReducer } =
  DeletePoll.actions;

export default DeletePoll.reducer;
