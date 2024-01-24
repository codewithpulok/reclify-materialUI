import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './features/auth/authSlice';
import { addressApi } from './services/addressApi';
import { adminApi } from './services/adminApi';
import { authApi } from './services/authApi';
import { reviewApi } from './services/reviewApi';
import { uploadFilesApi } from './services/uploadFilesApi';
import { warehouseApi } from './services/warehouseApi';

const reducers = combineReducers({
  // features
  [authSlice.name]: authSlice.reducer,
  // services
  [authApi.reducerPath]: authApi.reducer,
  [warehouseApi.reducerPath]: warehouseApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [uploadFilesApi.reducerPath]: uploadFilesApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
});

export default reducers;
