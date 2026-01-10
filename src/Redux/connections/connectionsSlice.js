import { createSlice } from "@reduxjs/toolkit";
import { fetchConnections } from "./connections.Thunk";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnections.fulfilled, (state, { payload }) => {
      state.connections = payload.data;
    });
  },
});

export const selectConnections = (state) => state.connections.connections;

export default connectionsSlice.reducer;
