import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { endpoints } from 'src/utils/api/client';

/**
 * public backend base query handler
 * @param {String} path - example: /warehouses
 * @returns
 */
export const publicBaseQuery = (path) =>
  fetchBaseQuery({
    baseUrl: `${endpoints.root}${path}`,
    prepareHeaders: (headers, { getState }) => {
      const authState = getState().auth;

      if (authState?.token) {
        headers.set('authorization', `Bearer ${authState?.token}`);
      }

      return headers;
    },
  });
