import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || undefined,
  },
  reducers: {
    login: (state, action) => {
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload);
        state.token = action.payload;
    },
    logout: (state) => {
        state.isLoggedIn = false;
        state.token = undefined;
        localStorage.removeItem("token");
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;