import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import authReducer from "./auth/auth.slice";

const appStore = configureStore({
  reducer: {
    auth: authReducer, // NOTE: auth reducer is just for example. its not being used.
    user: userReducer,
  },
});

export default appStore;
