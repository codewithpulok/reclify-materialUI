import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { PUBLIC_BACKEND_API } from 'src/config-global';

/**
 * backend base query handler
 * @param {String} path - example: /warehouses
 * @returns
 */
export const backendBaseQuery = (path) => fetchBaseQuery({ baseUrl: PUBLIC_BACKEND_API });
