import { combineReducers } from '@reduxjs/toolkit';

import { appearanceSlice } from './features/appearance/appearanceSlice';
import { authSlice } from './features/auth/authSlice';
import { achApi } from './services/achApi';
import { addressApi } from './services/addressApi';
import { adminApi } from './services/adminApi';
import { authApi } from './services/authApi';
import { billingApi } from './services/billingApi';
import { billingInfoApi } from './services/billingInfoApi';
import { blogApi } from './services/blogApi';
import { cardApi } from './services/cardApi';
import { contactApi } from './services/contactApi';
import { invoiceApi } from './services/invoiceApi';
import { notificationApi } from './services/notificationApi';
import { planApi } from './services/planApi';
import { profileApi } from './services/profileApi';
import { purchaseApi } from './services/purchaseApi';
import { reviewApi } from './services/reviewApi';
import { searchApi } from './services/searchApi';
import { serviceApi } from './services/serviceApi';
import { transactionApi } from './services/transactionApi';
import { uploadFilesApi } from './services/uploadFilesApi';
import { warehouseApi } from './services/warehouseApi';

const reducers = combineReducers({
  // features
  [authSlice.name]: authSlice.reducer,
  [appearanceSlice.name]: appearanceSlice.reducer,
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
  [planApi.reducerPath]: planApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [achApi.reducerPath]: achApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [billingApi.reducerPath]: billingApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
});

export default reducers;
