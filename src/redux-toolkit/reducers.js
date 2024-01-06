import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './features/auth/authSlice';
import { authApi } from './services/authApi';

const reducers = combineReducers({
  // features
  [authSlice.name]: authSlice.reducer,
  // services
  [authApi.reducerPath]: authApi.reducer,
});

export default reducers;
