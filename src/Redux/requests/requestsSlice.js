import { createSlice } from "@reduxjs/toolkit";
import { fetchRequests, reviewRequest } from "./requestsThunk";

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.fulfilled, (state, { payload }) => {
        state.requests = payload.data;
      })
      .addCase(reviewRequest.fulfilled, (state, { payload }) => {
        const updatedRequests = state.requests?.filter(
          (request) => request._id !== payload.data._id,
        );

        state.requests = updatedRequests;
      });
  },
});

export const selectRequests = (state) => state.requests.requests;

export default requestsSlice.reducer;
