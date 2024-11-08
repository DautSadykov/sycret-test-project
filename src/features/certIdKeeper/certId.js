import { createSlice } from "@reduxjs/toolkit";

export const certIdReducer = createSlice({
  name: "certId",
  initialState: {
    value: '',
  },
  reducers: {
    setCertId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCertId } = certIdReducer.actions;
export default certIdReducer.reducer;