import { authApi } from './services/authApi';
import { reviewApi } from './services/reviewApi';
import { warehouseApi } from './services/warehouseApi';

const middlewares = [authApi.middleware, warehouseApi.middleware, reviewApi.middleware];

export default middlewares;
