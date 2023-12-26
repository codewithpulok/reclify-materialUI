import { nanoid } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { backendBaseQuery } from '../utills';

export const warehouseApi = createApi({
  reducerPath: 'warehouseApi',
  baseQuery: backendBaseQuery('/warehouses'),
  endpoints: (builder) => ({
    getAllWarehouses: builder.query({
      query: () => '/',
    }),
    createWarehouse: builder.mutation({
      query: (warehouse) => ({
        url: '/',
        method: 'POST',
        body: { id: nanoid(), ...warehouse },
      }),
    }),
  }),
});

export const { useGetAllWarehousesQuery, useCreateWarehouseMutation } = warehouseApi;
