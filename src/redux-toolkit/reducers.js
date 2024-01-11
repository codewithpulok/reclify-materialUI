import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './features/auth/authSlice';
import { authApi } from './services/authApi';
import { warehouseApi } from './services/warehouseApi';

const reducers = combineReducers({
  // features
  [authSlice.name]: authSlice.reducer,
  // services
  [authApi.reducerPath]: authApi.reducer,
  [warehouseApi.reducerPath]: warehouseApi.reducer,
});

export default reducers;
