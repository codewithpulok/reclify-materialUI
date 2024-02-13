import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: publicBaseQuery(endpoints.search.root),
  endpoints: (builder) => ({
    searchAll: builder.query({
      query: (q) => endpoints.search.query(q),
    }),
    searchWarehouses: builder.query({
      query: (q) => endpoints.search.warehouses(q),
    }),
    searchUsers: builder.query({
      query: (q) => endpoints.search.users(q),
    }),
    searchServices: builder.query({
      query: (q) => endpoints.search.services(q),
    }),
  }),
});

export const {
  useLazySearchAllQuery,
  useLazySearchServicesQuery,
  useLazySearchUsersQuery,
  useLazySearchWarehousesQuery,
  useSearchAllQuery,
  useSearchServicesQuery,
  useSearchUsersQuery,
  useSearchWarehousesQuery,
} = searchApi;
