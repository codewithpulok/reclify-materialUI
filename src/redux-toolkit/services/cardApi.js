import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: publicBaseQuery(endpoints.cards.root),
  endpoints: (builder) => ({
    cardList: builder.query({
      query: () => endpoints.cards.list,
    }),
    cardGet: builder.query({
      query: (id) => endpoints.cards.get(id),
    }),
    cardCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.cards.create,
        body: data,
        method: 'POST',
      }),
    }),
    cardUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.cards.update(id),
        body: data,
        method: 'PUT',
      }),
    }),
    cardDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.cards.delete(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCardCreateMutation,
  useCardDeleteMutation,
  useCardGetQuery,
  useCardListQuery,
  useCardUpdateMutation,
  useLazyCardGetQuery,
  useLazyCardListQuery,
} = cardApi;
