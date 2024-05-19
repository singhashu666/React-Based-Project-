import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
import { dispatch } from "../store/store";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const DeletePollOptions = createSlice({
  name: "deletePollOptions",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    optionDeleteSuccessful: (state, action) => {
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
    deleteOptionResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const DeletePollOptionsApi = (payload) => async () => {
  dispatch(startLoading());
  try {
    let response = await Instance.delete(`delete_poll_option?id=${payload.deleteId}&option_text=${payload.deleteText}`);
    dispatch(optionDeleteSuccessful(response.data));
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, optionDeleteSuccessful, hasError, deleteOptionResetReducer } =
  DeletePollOptions.actions;

export default DeletePollOptions.reducer;
