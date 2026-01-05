import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./usersThunks";

const SIGN_IN_API_STATUS = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

const INITIAL_STATE = {
  status: SIGN_IN_API_STATUS.IDLE,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    // addUser: (_, action) => {
    //   return action.payload;
    // },
    removeUser: () => {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = SIGN_IN_API_STATUS.PENDING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = SIGN_IN_API_STATUS.SUCCESS;
      state.user = action.payload.data;
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = SIGN_IN_API_STATUS.FAILED;
      state.error = action.payload.message || "Unknown error";
    });
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
