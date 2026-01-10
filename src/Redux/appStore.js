import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import authReducer from "./auth/auth.slice";
import feedReducer from "./feed/feedSlice";
import connectionsReducer from "./connections/connectionsSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer, // NOTE: auth reducer is just for example. its not being used.
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
  },
});

export default appStore;
