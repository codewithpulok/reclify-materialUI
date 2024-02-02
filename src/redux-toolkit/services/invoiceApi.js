import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: publicBaseQuery(endpoints.invoices.root),
  endpoints: (builder) => ({
    invoiceList: builder.query({
      query: () => endpoints.invoices.list,
    }),
  }),
});

export const { useInvoiceListQuery, useLazyInvoiceListQuery } = invoiceApi;
