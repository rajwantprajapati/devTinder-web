import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./authThunk";

const INITIAL_STATE = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload.message || "Unknown error";
    });
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
