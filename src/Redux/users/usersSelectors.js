import { createSelector } from "@reduxjs/toolkit";

export const selectSignInApiStatus = (state) => state.user.status;
export const selectUser = (state) => state.user.user;
export const selectUserError = (state) => state.user.error;

export const selectUserFirstName = createSelector(
  [selectUser],
  (user) => user?.firstName || "",
);

export const selectUserPhotoUrl = createSelector(
  [selectUser],
  (user) => user?.photoUrl || "",
);
