import { createSlice } from '@reduxjs/toolkit';

/** @type {AuthType} */
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
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
