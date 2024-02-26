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
      if (action.payload?.firstName !== undefined) state.user.firstName = action.payload.firstName;
      if (action.payload?.lastName !== undefined) state.user.lastName = action.payload.lastName;
      if (action.payload?.email !== undefined) state.user.email = action.payload.email;
      if (action.payload?.serviceType !== undefined)
        state.user.serviceType = action.payload.serviceType;
      if (action.payload?.planId !== undefined) state.user.planId = action.payload.planId;
      if (action.payload?.avatar !== undefined) state.user.avatar = action.payload.avatar;
      if (action.payload?.stripeAccountCompleteStatus !== undefined)
        state.user.stripeAccountCompleteStatus = action.payload.stripeAccountCompleteStatus;
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
