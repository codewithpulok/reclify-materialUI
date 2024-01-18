import { authApi } from './services/authApi';
import { fileUploadApi } from './services/fileUploadApi';
import { reviewApi } from './services/reviewApi';
import { warehouseApi } from './services/warehouseApi';

const middlewares = [
  authApi.middleware,
  warehouseApi.middleware,
  reviewApi.middleware,
  fileUploadApi.middleware,
];

export default middlewares;
