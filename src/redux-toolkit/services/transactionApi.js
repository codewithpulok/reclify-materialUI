import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: publicBaseQuery(endpoints.transaction.root),
  endpoints: (builder) => ({
    approveTransaction: builder.mutation({
      query: (id) => ({
        url: endpoints.transaction.approve(id),
        method: 'PUT',
      }),
    }),
    cancelTransaction: builder.mutation({
      query: (id) => ({
        url: endpoints.transaction.cancel(id),
        method: 'PUT',
      }),
    }),
    listTransaction: builder.query({
      query: () => endpoints.transaction.list,
    }),
  }),
});

export const {
  useApproveTransactionMutation,
  useCancelTransactionMutation,
  useLazyListTransactionQuery,
  useListTransactionQuery,
} = transactionApi;
