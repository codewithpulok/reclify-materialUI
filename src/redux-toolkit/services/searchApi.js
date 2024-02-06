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
      transformResponse: (values, meta, arg) => {
        const results = values.results?.warehouses || [];

        values.results = results;
        return values;
      },
    }),
    searchUsers: builder.query({
      query: (q) => endpoints.search.users(q),
      transformResponse: (values, meta, arg) => {
        const results = values.results?.users || [];

        values.results = results;
        return values;
      },
    }),
    searchServices: builder.query({
      query: (q) => endpoints.search.services(q),
      transformResponse: (values, meta, arg) => {
        const results = values.results?.services || [];

        values.results = results;
        return values;
      },
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
