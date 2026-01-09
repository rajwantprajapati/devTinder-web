import { createSlice } from "@reduxjs/toolkit";
import { editProfile, fetchUser, signIn } from "./usersThunks";

export const API_STATUS = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

const INITIAL_STATE = {
  status: API_STATUS.IDLE,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    // addUser: (state, action) => {
    //   state.user = action.payload.data;
    // },
    removeUser: () => {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    [signIn, fetchUser, editProfile].forEach((thunk) =>
      handleAsyncCases(builder, thunk),
    );
  },
});

// Helper to handle pending, fulfilled, and rejected
const handleAsyncCases = (builder, thunk) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.status = API_STATUS.PENDING;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = API_STATUS.SUCCESS;
      state.user = action.payload.data;
      state.error = null;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = API_STATUS.FAILED;
      state.error = action.payload?.message || "Unknown error";
    });
};

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
