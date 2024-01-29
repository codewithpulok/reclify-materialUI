import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const billingInfoApi = createApi({
  reducerPath: 'billingInfoApi',
  baseQuery: publicBaseQuery(endpoints.billing_info.root),
  endpoints: (builder) => ({
    billingInfoList: builder.query({
      query: () => endpoints.billing_info.list,
      transformResponse: (response, meta, arg) => {
        if (response?.results?.billingInfo instanceof Array) {
          response.results = response?.results?.billingInfo;
        }
        return response;
      },
    }),
    billingInfoGet: builder.query({
      query: (id) => endpoints.billing_info.get(id),
    }),
    billingInfoPrimary: builder.query({
      query: () => endpoints.billing_info.list,
      transformResponse: (response, meta, arg) => {
        if (response?.results?.billingInfo instanceof Array) {
          response.results = response?.results?.billingInfo.find((b) => b?.primary) || null;
        }
        return response;
      },
    }),
    billingInfoCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.billing_info.create,
        body: data,
        method: 'POST',
      }),
    }),
    billingInfoUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.billing_info.update(id),
        body: data,
        method: 'PUT',
      }),
    }),
    billingInfoDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.billing_info.delete(id),
        method: 'DELETE',
      }),
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
