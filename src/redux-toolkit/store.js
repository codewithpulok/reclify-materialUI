import { configureStore } from '@reduxjs/toolkit';

import middlewares from './middlewares';
import reducers from './reducers';

export const makeStore = () =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
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
