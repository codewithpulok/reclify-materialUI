import { createSlice } from '@reduxjs/toolkit';

/** @type {AuthType} */
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

/**
 * Select auth state
 * @param {import('src/redux-toolkit/store').RootState} state
 * @returns {AuthType}
 */
export const selectAuth = (state) => state.auth;
