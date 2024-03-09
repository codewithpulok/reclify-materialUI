import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const updateStatus = (dispatch, arg, value) => {
  dispatch(
    transactionApi.util.updateQueryData('listTransaction', undefined, (draft) => {
      const updateIndex = draft.results.findIndex((w) => w.id === arg);
      if (updateIndex !== -1) draft.results[updateIndex].status = value;
    })
  );

  dispatch(
    transactionApi.util.updateQueryData('getTransaction', arg, (draft) => {
      if (draft?.results?.status) draft.results.status = value;
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
    getTransaction: builder.query({
      query: (id) => endpoints.transaction.get(id),
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
          updateStatus(dispatch, arg, 'approved');
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
  useCancelTransactionMutation,
  useLazyListTransactionQuery,
  useListTransactionQuery,
  useCompleteTransactionMutation,
  useGetTransactionQuery,
  useLazyGetTransactionQuery,
} = transactionApi;
