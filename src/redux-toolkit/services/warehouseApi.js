import { createApi } from '@reduxjs/toolkit/query/react';
import { publicBaseQuery } from '../utills';

export const warehouseApi = createApi({
  reducerPath: 'warehouseApi',
  baseQuery: publicBaseQuery('/warehouses'),
  endpoints: (builder) => ({
    warehouse: builder.query({
      query: (id) => `/${id}`,
    }),
    warehouseList: builder.query({
      query: () => '/',
    }),
    warehouseCreate: builder.mutation({
      query: (warehouseData) => ({
        url: '/',
        body: warehouseData,
        method: 'POST',
      }),
    }),
    warehouseUpdate: builder.mutation({
      query: (id, warehouseData) => ({
        url: `/${id}`,
        body: warehouseData,
        method: 'PUT',
      }),
    }),
    warehouseDelete: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyWarehouseListQuery,
  useLazyWarehouseQuery,
  useWarehouseListQuery,
  useWarehouseQuery,
  useWarehouseCreateMutation,
  useWarehouseDeleteMutation,
  useWarehouseUpdateMutation,
} = warehouseApi;
