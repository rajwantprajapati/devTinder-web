import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
