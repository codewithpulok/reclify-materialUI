import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './features/auth/authSlice';
import { addressApi } from './services/addressApi';
import { adminApi } from './services/adminApi';
import { authApi } from './services/authApi';
import { billingInfoApi } from './services/billingInfoApi';
import { cardApi } from './services/cardApi';
import { profileApi } from './services/profileApi';
import { purchaseApi } from './services/purchaseApi';
import { reviewApi } from './services/reviewApi';
import { serviceApi } from './services/serviceApi';
import { transactionApi } from './services/transactionApi';
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
  [profileApi.reducerPath]: profileApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [billingInfoApi.reducerPath]: billingInfoApi.reducer,
  [cardApi.reducerPath]: cardApi.reducer,
});

export default reducers;
