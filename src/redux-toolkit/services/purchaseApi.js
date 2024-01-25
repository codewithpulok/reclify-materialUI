import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const purchaseApi = createApi({
  reducerPath: 'purchaseApi',
  baseQuery: publicBaseQuery(endpoints.purchase.root),
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: endpoints.purchase.create,
        body: data,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreatePurchaseMutation } = purchaseApi;
