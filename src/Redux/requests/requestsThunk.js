import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Configuration/axios";

export const fetchRequests = createAsyncThunk(
  "/user/requests/recieved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/requests/recieved");

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  },
);
