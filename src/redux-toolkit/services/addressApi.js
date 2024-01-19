import { createApi } from '@reduxjs/toolkit/query/react';
import { publicBaseQuery } from '../utills';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: publicBaseQuery('/addresses'),
  endpoints: (builder) => ({
    addressCreate: builder.mutation({
      query: (data) => ({
        url: '/',
        body: data,
        method: 'POST',
      }),
    }),
    addressUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        body: data,
        method: 'PUT',
      }),
    }),
    addressDelete: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    addressSearch: builder.query({
      query: (query) => ({
        url: `/search?search=${query}`,
      }),
    }),
    addressGet: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const {
  useAddressCreateMutation,
  useAddressDeleteMutation,
  useAddressGetQuery,
  useAddressSearchQuery,
  useAddressUpdateMutation,
  useLazyAddressGetQuery,
  useLazyAddressSearchQuery,
} = addressApi;
