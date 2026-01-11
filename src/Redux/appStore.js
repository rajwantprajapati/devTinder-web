import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import authReducer from "./auth/auth.slice";
import feedReducer from "./feed/feedSlice";
import connectionsReducer from "./connections/connectionsSlice";
import requestsReducer from "./requests/requestsSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer, // NOTE: auth reducer is just for example. its not being used.
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default appStore;
