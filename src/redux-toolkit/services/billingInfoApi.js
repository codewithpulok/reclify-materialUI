import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const billingInfoApi = createApi({
  reducerPath: 'billingInfoApi',
  baseQuery: publicBaseQuery(endpoints.billing_info.root),
  endpoints: (builder) => ({
    billingInfoList: builder.query({
      query: () => endpoints.billing_info.list,
    }),
    billingInfoGet: builder.query({
      query: (id) => endpoints.billing_info.get(id),
    }),
    billingInfoPrimary: builder.query({
      query: () => endpoints.billing_info.primary,
    }),
    billingInfoCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.billing_info.create,
        body: data,
        method: 'POST',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            billingInfoApi.util.updateQueryData('billingInfoList', undefined, (draft) => {
              // if other primary exist the make it false
              if (data?.results?.isPrimary && draft.results?.length) {
                const primaryIndex = draft.results.find((d) => d.isPrimary);
                if (primaryIndex) draft.results[primaryIndex].isPrimary = false;
              }

              if (Array.isArray(draft?.results)) {
                draft.results?.push(data?.results);
              }
            })
          );
        } catch (error) {
          console.error('ERROR: Billing info Cache update', error);
        }
      },
    }),
    billingInfoUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.billing_info.update(id),
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            billingInfoApi.util.updateQueryData('billingInfoList', undefined, (draft) => {
              const updateIndex = draft?.results?.findIndex((d) => d.id === arg?.id);

              // if other primary exist the make it false
              if (data?.results?.isPrimary && draft.results?.length) {
                const primaryIndex = draft.results.find((d) => d.isPrimary);
                if (primaryIndex) draft.results[primaryIndex].isPrimary = false;
              }

              if (updateIndex !== -1) draft.results[updateIndex] = data?.results;
            })
          );
          // update details cache
          dispatch(
            billingInfoApi.util.updateQueryData('billingInfoGet', arg.id, (draft) => {
              draft.results = data?.results;
            })
          );
        } catch (error) {
          console.error('ERROR: Billing info Cache update', error);
        }
      },
    }),
    billingInfoDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.billing_info.delete(id),
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          // update list cache
          dispatch(
            billingInfoApi.util.updateQueryData('billingInfoList', undefined, (draft) => {
              const filtered = draft.results.filter((b) => b.id !== arg);
              draft.results = filtered;
            })
          );
        } catch (error) {
          console.error('ERROR: Billing info Cache update', error);
        }
      },
    }),
  }),
});

export const {
  useBillingInfoCreateMutation,
  useBillingInfoDeleteMutation,
  useBillingInfoGetQuery,
  useBillingInfoListQuery,
  useBillingInfoUpdateMutation,
  useLazyBillingInfoGetQuery,
  useLazyBillingInfoListQuery,
  useBillingInfoPrimaryQuery,
  useLazyBillingInfoPrimaryQuery,
} = billingInfoApi;
