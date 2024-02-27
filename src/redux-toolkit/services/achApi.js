import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const achApi = createApi({
  reducerPath: 'achApi',
  baseQuery: publicBaseQuery(endpoints.ach.root),
  endpoints: (builder) => ({
    achList: builder.query({
      query: () => endpoints.ach.list,
    }),
    achGet: builder.query({
      query: (id) => endpoints.ach.get(id),
    }),
    achPrimary: builder.query({
      query: () => endpoints.ach.primary,
    }),
    achCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.ach.create,
        body: data,
        method: 'POST',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            achApi.util.updateQueryData('achList', undefined, (draft) => {
              // if other primary exist the make it false
              if (data?.results?.isPrimary && Array.isArray(draft?.results)) {
                const primaryIndex = draft.results.findIndex((d) => d.isPrimary);
                if (primaryIndex !== -1) draft.results[primaryIndex].isPrimary = false;
              }

              if (Array.isArray(draft?.results)) {
                draft.results?.push(data?.results);
              }
            })
          );
          // update the primary cache
          dispatch(
            achApi.util.updateQueryData('achPrimary', undefined, (draft) => {
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
          console.error('ERROR: ACH Cache update', error);
        }
      },
    }),
    achUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.ach.update(id),
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            achApi.util.updateQueryData('achList', undefined, (draft) => {
              const updateIndex = draft?.results?.findIndex((d) => d.id === arg?.id);

              // if other primary exist the make it false
              if (data?.results?.isPrimary && draft.results?.length) {
                const primaryIndex = draft.results.findIndex((d) => d.isPrimary);
                console.log({ primaryIndex });
                if (primaryIndex !== -1) draft.results[primaryIndex].isPrimary = false;
              }

              if (updateIndex !== -1) draft.results[updateIndex] = data?.results;
            })
          );
          // update details cache
          dispatch(
            achApi.util.updateQueryData('achGet', arg.id, (draft) => {
              draft.results = data?.results;
            })
          );
          // update the primary cache
          dispatch(
            achApi.util.updateQueryData('achPrimary', undefined, (draft) => {
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
          console.error('ERROR: ACH Cache update', error);
        }
      },
    }),
    achDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.ach.delete(id),
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          // update list cache
          dispatch(
            achApi.util.updateQueryData('achList', undefined, (draft) => {
              const filtered = draft.results.filter((b) => b.id !== arg);
              draft.results = filtered;
            })
          );
          // update the primary cache
          dispatch(
            achApi.util.updateQueryData('achPrimary', undefined, (draft) => {
              // if it's primary then update primary cache
              if (draft?.results?.id === arg) {
                draft.results = null;
                draft.success = false;
                draft.statusCode = 404;
              }
            })
          );
        } catch (error) {
          console.error('ERROR: ACH Cache update', error);
        }
      },
    }),
  }),
});

export const {
  useAchCreateMutation,
  useAchDeleteMutation,
  useAchGetQuery,
  useAchListQuery,
  useAchPrimaryQuery,
  useAchUpdateMutation,
  useLazyAchGetQuery,
  useLazyAchListQuery,
  useLazyAchPrimaryQuery,
} = achApi;
