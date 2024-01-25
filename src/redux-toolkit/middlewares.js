import { addressApi } from './services/addressApi';
import { adminApi } from './services/adminApi';
import { authApi } from './services/authApi';
import { profileApi } from './services/profileApi';
import { reviewApi } from './services/reviewApi';
import { serviceApi } from './services/serviceApi';
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
];

export default middlewares;
