import { createApi } from '@reduxjs/toolkit/query/react';
import { publicBaseQuery } from '../utills';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: publicBaseQuery('/reviews'),
  endpoints: (builder) => ({
    reviewCreate: builder.mutation({
      query: (reviewData) => ({
        url: '/',
        body: reviewData,
        method: 'POST',
      }),
    }),
    reviewUpdate: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `/${id}`,
        body: reviewData,
        method: 'PUT',
      }),
    }),
    reviewDelete: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useReviewCreateMutation, useReviewDeleteMutation, useReviewUpdateMutation } =
  reviewApi;
