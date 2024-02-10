import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const billingApi = createApi({
  reducerPath: 'billingApi',
  baseQuery: publicBaseQuery(endpoints.billing.root),
  endpoints: (builder) => ({
    getBilling: builder.query({
      query: () => endpoints.billing.get,
    }),
  }),
});

export const { useGetBillingQuery, useLazyGetBillingQuery } = billingApi;
