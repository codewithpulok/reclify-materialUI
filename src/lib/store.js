import { configureStore } from '@reduxjs/toolkit';
import { warehouseApi } from './services/warehouseApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      [warehouseApi.reducerPath]: warehouseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(warehouseApi.middleware),
  });

/**
 * @typedef {object} AppStore
 * @type {ReturnType<typeof makeStore>}
 */

/**
 * @typedef {object} RootState
 * @type {ReturnType<AppStore['getState']>}
 */

/**
 * @typedef {import('@reduxjs/toolkit').ThunkDispatch} AppDispatch
 * @type {AppStore['dispatch']}
 */
