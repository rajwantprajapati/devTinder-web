import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Configuration/axios";
import { addUser } from "../users/userSlice";

export const signIn = createAsyncThunk(
  "/signin",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/signin", payload);

      dispatch(addUser(response.data));

      return { isAuthenticated: true };
    } catch (error) {
      console.log("Error in thunk: ", error.message);

      return rejectWithValue({ message: error.message, status: error.status });
    }
  },
);
