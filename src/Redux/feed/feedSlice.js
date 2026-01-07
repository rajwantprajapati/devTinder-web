import { createSlice } from "@reduxjs/toolkit";
import { fetchFeed } from "./feedThunk";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feeds: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, { payload }) => {
      state.feeds = payload.data;
    });
    builder.addCase(fetchFeed.rejected, (state, { payload }) => {
      state.feeds = null;
      state.error = payload.message;
    });
  },
});

export const selectFeeds = (state) => state.feed.feeds;

export default feedSlice.reducer;
