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
    cardPrimary: builder.query({
      query: () => endpoints.cards.primary,
    }),
    cardCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.cards.create,
        body: data,
        method: 'POST',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            cardApi.util.updateQueryData('cardList', undefined, (draft) => {
              // if other primary exist the make it false
              if (data?.results?.isPrimary && Array.isArray(draft?.results)) {
                const primaryIndex = draft.results.findIndex((d) => d.isPrimary === true);
                if (primaryIndex !== -1) draft.results[primaryIndex].isPrimary = false;
              }
              // update the existing array
              if (Array.isArray(draft?.results)) {
                draft.results?.push(data?.results);
              }
            })
          );
          // update the primary cache
          dispatch(
            cardApi.util.updateQueryData('cardPrimary', undefined, (draft) => {
              // if it's primary then update primary cache
              if (data?.results?.isPrimary) {
                draft.results = data?.results;
                draft.success = true;
                draft.statusCode = 200;
                draft.error = undefined;
                draft.message = undefined;
              }
            })
          );
        } catch (error) {
          console.error('ERROR: Card Cache update', error);
        }
      },
    }),
    cardUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.cards.update(id),
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            cardApi.util.updateQueryData('cardList', undefined, (draft) => {
              const updateIndex = draft?.results?.findIndex((d) => d.id === arg?.id);

              // if other primary exist the make it false
              if (data?.results?.isPrimary && draft.results?.length) {
                const primaryIndex = draft.results.findIndex((d) => d.isPrimary);
                if (primaryIndex !== -1) draft.results[primaryIndex].isPrimary = false;
              }

              if (updateIndex !== -1) draft.results[updateIndex] = data?.results;
            })
          );
          // update details cache
          dispatch(
            cardApi.util.updateQueryData('cardGet', arg.id, (draft) => {
              draft.results = data?.results;
            })
          );
          // update the primary cache
          dispatch(
            cardApi.util.updateQueryData('cardPrimary', undefined, (draft) => {
              // if it's primary then update primary cache
              if (data?.results?.isPrimary) {
                draft.results = data?.results;
                draft.success = true;
                draft.statusCode = 200;
                draft.error = undefined;
                draft.message = undefined;
              }
            })
          );
        } catch (error) {
          console.error('ERROR: Card Cache update', error);
        }
      },
    }),
    cardDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.cards.delete(id),
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // update list cache
          dispatch(
            cardApi.util.updateQueryData('cardList', undefined, (draft) => {
              const filtered = draft.results.filter((b) => b.id !== arg);
              draft.results = filtered;
            })
          );
          // update the primary cache
          dispatch(
            cardApi.util.updateQueryData('cardPrimary', undefined, (draft) => {
              // if it's primary then update primary cache
              if (draft?.results?.id === arg) {
                draft.results = null;
                draft.success = false;
                draft.statusCode = 404;
                draft.error = undefined;
                draft.message = undefined;
              }
            })
          );
        } catch (error) {
          console.error('ERROR: Card Cache update', error);
        }
      },
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
  useCardPrimaryQuery,
  useLazyCardPrimaryQuery,
} = cardApi;
