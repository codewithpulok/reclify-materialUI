import { addressApi } from './services/addressApi';
import { adminApi } from './services/adminApi';
import { authApi } from './services/authApi';
import { billingInfoApi } from './services/billingInfoApi';
import { blogApi } from './services/blogApi';
import { cardApi } from './services/cardApi';
import { invoiceApi } from './services/invoiceApi';
import { planApi } from './services/planApi';
import { profileApi } from './services/profileApi';
import { purchaseApi } from './services/purchaseApi';
import { reviewApi } from './services/reviewApi';
import { serviceApi } from './services/serviceApi';
import { transactionApi } from './services/transactionApi';
import { uploadFilesApi } from './services/uploadFilesApi';
import { warehouseApi } from './services/warehouseApi';

const middlewares = [
  authApi.middleware,
  warehouseApi.middleware,
  reviewApi.middleware,
  uploadFilesApi.middleware,
  addressApi.middleware,
  adminApi.middleware,
  profileApi.middleware,
  serviceApi.middleware,
  purchaseApi.middleware,
  transactionApi.middleware,
  billingInfoApi.middleware,
  cardApi.middleware,
  planApi.middleware,
  invoiceApi.middleware,
  blogApi.middleware,
];

export default middlewares;
