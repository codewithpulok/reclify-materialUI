import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './features/auth/authSlice';
import { authApi } from './services/authApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      // features
      [authSlice.name]: authSlice.reducer,
      // services
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
    devTools: true,
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
