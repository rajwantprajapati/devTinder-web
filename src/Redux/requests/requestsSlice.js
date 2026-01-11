import { createSlice } from "@reduxjs/toolkit";
import { fetchRequests } from "./requestsThunk";

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRequests.fulfilled, (state, { payload }) => {
      state.requests = payload.data;
    });
  },
});

export const selectRequests = (state) => state.requests.requests;

export default requestsSlice.reducer;
