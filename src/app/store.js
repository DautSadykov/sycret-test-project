import { configureStore } from "@reduxjs/toolkit";
import certIdReducer from "../features/certIdKeeper/certId";

export default configureStore({
  reducer: {
    certId: certIdReducer,
  },
});
