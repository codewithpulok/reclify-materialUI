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
      onQueryStarted: async (warehouse, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update the waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseList', undefined, (draft) => {
              draft.results.push(data.results);
            })
          );
        } catch (error) {
          // console.log("Warehouse Create API Error: ", error);
        }
      },
    }),
    warehouseUpdate: builder.mutation({
      query: ({ id, warehouseData }) => ({
        url: `/${id}`,
        body: warehouseData,
        method: 'PUT',
      }),
      onQueryStarted: async ({ id, warehouse }, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update the waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseList', undefined, (draft) => {
              const updateIndex = draft.results.findIndex((w) => w.id === id);
              if (updateIndex !== -1) draft.results[updateIndex] = data?.results;
            })
          );
          // update the individual warehouse cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouse', id, (draft) => {
              draft.results = data.results;
            })
          );
        } catch (error) {
          // console.log("Warehouse Update API Error: ", error);
        }
      },
    }),
    warehouseDelete: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          // update the waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseList', undefined, (draft) => {
              const filtered = draft.results.filter((w) => w.id !== id);
              draft = filtered;
            })
          );
        } catch (error) {
          // console.log("Warehouse Update API Error: ", error);
        }
      },
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
