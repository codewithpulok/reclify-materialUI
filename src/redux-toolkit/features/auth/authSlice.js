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
    update: (state, action) => {
      if (action.payload?.firstName) state.user.firstName = action.payload.firstName;
      if (action.payload?.lastName) state.user.lastName = action.payload.lastName;
      if (action.payload?.email) state.user.email = action.payload.email;
      if (action.payload?.serviceType) state.user.serviceType = action.payload.serviceType;
    },
  },
});

export const { login, logout, update } = authSlice.actions;

/**
 * Select auth state
 * @param {import('src/redux-toolkit/store').RootState} state
 * @returns {AuthType}
 */
export const selectAuth = (state) => state.auth;
