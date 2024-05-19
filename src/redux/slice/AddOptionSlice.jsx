import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
import { dispatch } from "../store/store";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};

const addOption = createSlice({
  name: "addOption",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    addSuccessful: (state, action) => {
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
    addOptionResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const AddOptionApi = (payload) => async () => {
  try {
    dispatch(addOption.actions.startLoading());
    const response = await Instance.post(
        `add_new_option?id=${payload.id}&option_text=${payload.option}`,
      );
      if(response.status==200){
        dispatch(addOption.actions.addSuccessful(response.data));
      }
      else{
        dispatch(addOption.actions.hasError(response.data));
      }

  } catch (e) {
    dispatch(editPoll.actions.hasError(e));
  }
};

export const { startLoading, addSuccessful, hasError, addOptionResetReducer } =
  addOption.actions;

export default addOption.reducer;
