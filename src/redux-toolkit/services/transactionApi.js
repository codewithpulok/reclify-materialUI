import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

const updateStatus = (dispatch, arg, value) => {
  dispatch(
    transactionApi.util.updateQueryData('listTransaction', undefined, (draft) => {
      const updateIndex = draft.results.findIndex((w) => w.id === arg);
      if (updateIndex !== -1) draft.results[updateIndex].status = value;
    })
  );
};

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: publicBaseQuery(endpoints.transaction.root),
  endpoints: (builder) => ({
    listTransaction: builder.query({
      query: () => endpoints.transaction.list,
    }),
    approveTransaction: builder.mutation({
      query: (id) => ({
        url: endpoints.transaction.approve(id),
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.success) throw new Error(response);

          // update the transaction list cache
          updateStatus(dispatch, arg, 'pending');
        } catch (error) {
          console.error('Transction cache update error: ', error);
        }
      },
    }),
    completeTransaction: builder.mutation({
      query: (id) => ({
        url: endpoints.transaction.complete(id),
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.success) throw new Error(response);

          // update the transaction list cache
          updateStatus(dispatch, arg, 'completed');
        } catch (error) {
          console.error('Transction cache update error: ', error);
        }
      },
    }),
    cancelTransaction: builder.mutation({
      query: (id) => ({
        url: endpoints.transaction.cancel(id),
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.success) throw new Error(response);

          // update the transaction list cache
          updateStatus(dispatch, arg, 'cancelled');
        } catch (error) {
          console.error('Transction cache update error: ', error);
        }
      },
    }),
  }),
});

export const {
  useApproveTransactionMutation,
  useCancelTransactionMutation,
  useLazyListTransactionQuery,
  useListTransactionQuery,
  useCompleteTransactionMutation,
} = transactionApi;
