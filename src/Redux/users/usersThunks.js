import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Configuration/axios";
import { removeUser } from "./userSlice";

export const signIn = createAsyncThunk(
  "/signin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signin", payload);

      return response.data;
    } catch (error) {
      console.log("Error in thunk: ", error.response.data.error);

      return rejectWithValue({
        message: error.response.data.error.message,
        status: error.status,
      });
    }
  },
);

export const fetchUser = createAsyncThunk(
  "/profile/view",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/profile/view");

      return response.data;
    } catch (error) {
      console.log("Error in thunk: ", error.response.data.message);

      return rejectWithValue({
        message: error.response.data.error,
        status: error.status,
      });
    }
  },
);

export const signOut = createAsyncThunk(
  "/signout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.post("/signout");

      dispatch(removeUser());
    } catch (error) {
      console.log("Error in thunk: ", error.message);

      return rejectWithValue({ message: error.message, status: error.status });
    }
  },
);
