import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Configuration/axios";

export const signIn = createAsyncThunk(
  "/signin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signin", payload);

      return response.data;
    } catch (error) {
      console.log("Error in thunk: ", error.message);

      return rejectWithValue({ message: error.message, status: error.status });
    }
  },
);
