import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';
import { warehouseApi } from './warehouseApi';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: publicBaseQuery(endpoints.reviews.root),
  endpoints: (builder) => ({
    reviewCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.reviews.create,
        body: data,
        method: 'POST',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update the individual warehouse cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouse', arg?.warehouseId, (draft) => {
              const reviews = [...(draft.results?.reviews || [])];
              reviews.push(data.results);

              console.log(reviews);
              draft.results.reviews = reviews;
            })
          );
        } catch (error) {
          // console.log("Warehouse Update API Error: ", error);
        }
      },
    }),
    reviewUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.reviews.update(id),
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update the individual warehouse cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouse', arg?.data?.warehouseId, (draft) => {
              const reviews = [...(draft.results?.reviews || [])];

              const reviewIndex = reviews.findIndex((r) => r.id === arg.id);
              if (reviewIndex !== -1) reviews[reviewIndex] = data.results;

              draft.results.reviews = reviews;
            })
          );
        } catch (error) {
          // console.log("Warehouse Update API Error: ", error);
        }
      },
    }),
    reviewDelete: builder.mutation({
      query: (data) => ({
        url: endpoints.reviews.delete(data.id),
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          // update the individual warehouse cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouse', arg.warehouseId, (draft) => {
              const reviews = [...(draft.results?.reviews || [])];

              const filtered = reviews.filter((r) => r.id !== arg.id);

              draft.results.reviews = filtered;
            })
          );
        } catch (error) {
          // console.log("Warehouse Update API Error: ", error);
        }
      },
    }),
  }),
});

export const { useReviewCreateMutation, useReviewDeleteMutation, useReviewUpdateMutation } =
  reviewApi;
