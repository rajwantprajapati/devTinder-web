import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Configuration/axios";

export const fetchFeed = createAsyncThunk(
  "/user/feed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/feed");

      return response.data;
    } catch (error) {
      console.log("Error in feed api:", error);
      return rejectWithValue({ message: error.response.data.message });
    }
  },
);
