import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
import { dispatch } from "../store/store";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [], 
};

const AdminPoll = createSlice({
  name: "AdminPoll",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload.data;
    },
    hasError: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    },
    resetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export const AdminPollApi = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(`list_polls`);
    if(response.data.error===0){
      dispatch(getSuccess(response.data));
    }
    else{
      dispatch(hasError(response.data.error));
    }
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, getSuccess, hasError, resetReducer } =
  AdminPoll.actions;

export default AdminPoll.reducer;
