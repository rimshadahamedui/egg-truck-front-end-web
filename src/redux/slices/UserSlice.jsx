import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: null,
    name: null,
    role: null,
    isAuthenticated: false,
    isB2B: false,
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: () => initialState,

    toggleUserType: (state, { payload }) => {
      state.user = { ...state.user, isB2B: payload };
    },
  },
});

export const { setUser, clearUser, toggleUserType } = UserSlice.actions;

export default UserSlice.reducer;
