import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Configuration/axios";
import { removeUserFromFeed } from "../feed/feedSlice";

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

export const reviewRequest = createAsyncThunk(
  "/request/review",
  async ({ status, requestId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/request/review/${status}/${requestId}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  },
);

export const sendRequest = createAsyncThunk(
  "/request/send",
  async ({ status, userId }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.post(`/request/send/${status}/${userId}`);

      // Remove user from the feed, after marking the user interested/ignored
      dispatch(removeUserFromFeed({ _id: userId }));

      return { isConnectionSent: true };
    } catch (error) {
      console.log("error in sendRequest action: ", error.response);
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  },
);
