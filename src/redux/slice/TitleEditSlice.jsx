import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
import { dispatch } from "../store/store";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const editPoll = createSlice({
  name: "editPoll",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    editSuccessful: (state, action) => {
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
      state.data = {};
    },
  },
});

export const EditPollApi = (id,updatedData) => async () => {
  try {
    dispatch(editPoll.actions.startLoading());
    const response = await Instance.put(
        `/update_poll_title?id=${id}&title=${updatedData}`,
        updatedData
      );
    dispatch(editPoll.actions.editSuccessful(response.data));
  } catch (e) {
    dispatch(editPoll.actions.hasError(e));
  }
};

export const { startLoading, editSuccessful, hasError, resetReducer } =
  editPoll.actions;

export default editPoll.reducer;
