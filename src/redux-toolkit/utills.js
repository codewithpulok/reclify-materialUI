import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { PUBLIC_BACKEND_API } from 'src/config-global';

/**
 * public backend base query handler
 * @param {String} path - example: /warehouses
 * @returns
 */
export const publicBaseQuery = (path) =>
  fetchBaseQuery({
    baseUrl: `${PUBLIC_BACKEND_API}${path}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

      console.log({ token });

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });
