import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Configuration/axios";

export const fetchConnections = createAsyncThunk(
  "/user/connections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/connections");

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  },
);
