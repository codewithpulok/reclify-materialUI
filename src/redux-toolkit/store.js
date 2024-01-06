import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import { authApi } from './services/authApi';

export const makeStore = () =>
  configureStore({
    reducer: reducers,
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
