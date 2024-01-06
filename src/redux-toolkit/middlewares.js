import { authApi } from './services/authApi';
import { warehouseApi } from './services/warehouseApi';

const middlewares = [authApi.middleware, warehouseApi.middleware];

export default middlewares;
