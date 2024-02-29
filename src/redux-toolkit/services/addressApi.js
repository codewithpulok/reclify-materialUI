import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: publicBaseQuery(endpoints.address.root),
  endpoints: (builder) => ({
    addressCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.address.create,
        body: data,
        method: 'POST',
      }),
    }),
    addressUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.address.update,
        body: data,
        method: 'PUT',
      }),
    }),
    addressDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.address.delete(id),
        method: 'DELETE',
      }),
    }),
    addressSearch: builder.query({
      query: (query) => ({
        url: endpoints.address.search(query),
      }),
    }),
    addressGet: builder.query({
      query: (id) => ({
        url: endpoints.address.get(id),
      }),
    }),
    addressGoogleReviews: builder.mutation({
      query: (address) => ({
        url: endpoints.address.google_reviews,
        body: {
          address,
        },
        method: 'POST',
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
  useAddressGoogleReviewsMutation,
} = addressApi;
