import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: publicBaseQuery(endpoints.payment.root),
  endpoints: (builder) => ({
    refreshAccount: builder.query({
      query: () => endpoints.payment.account_refresh_url,
    }),
  }),
});

export const { useLazyRefreshAccountQuery, useRefreshAccountQuery } = paymentApi;
