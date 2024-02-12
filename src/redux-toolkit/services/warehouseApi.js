import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const warehouseApi = createApi({
  reducerPath: 'warehouseApi',
  baseQuery: publicBaseQuery(endpoints.warehouses.root),
  endpoints: (builder) => ({
    warehouse: builder.query({
      query: (id) => endpoints.warehouses.get(id),
    }),
    warehouseList: builder.query({
      /** @type {({region: string, hasDiscount: boolean, verified: boolean, featured: boolean, visible: boolean}) => {}} */
      query: (params) => ({
        url: endpoints.warehouses.list,
        params: {
          region: params?.region,
          hasDiscount: params?.hasDiscount,
          verified: params?.verified,
          featured: params?.featured,
          visible: params?.visible,
        },
      }),
    }),
    warehouseOwnList: builder.query({
      query: () => endpoints.warehouses.own,
    }),
    warehouseCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.warehouses.create,
        body: data,
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
          // update the own waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseOwnList', undefined, (draft) => {
              draft.results.push(data.results);
            })
          );
        } catch (error) {
          // console.log("Warehouse Create API Error: ", error);
        }
      },
    }),
    warehouseUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.warehouses.update(id),
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update the waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseList', undefined, (draft) => {
              const updateIndex = draft.results.findIndex((w) => w.id === arg.id);
              if (updateIndex !== -1) draft.results[updateIndex] = data?.results;
            })
          );
          // update the own waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseOwnList', undefined, (draft) => {
              const updateIndex = draft.results.findIndex((w) => w.id === arg.id);
              if (updateIndex !== -1) draft.results[updateIndex] = data?.results;
            })
          );
          // update the individual warehouse cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouse', arg.id, (draft) => {
              draft.results = data.results;
            })
          );
        } catch (error) {
          console.log('Warehouse Update API Error: ', error);
        }
      },
    }),
    warehouseDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.warehouses.delete(id),
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          // update the waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseList', undefined, (draft) => {
              const filtered = draft.results.filter((w) => w.id !== id);
              draft.results = filtered;
            })
          );
          // update the own waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseOwnList', undefined, (draft) => {
              const filtered = draft.results.filter((w) => w.id !== id);
              draft.results = filtered;
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
  useLazyWarehouseOwnListQuery,
  useWarehouseOwnListQuery,
  useWarehouseListQuery,
  useWarehouseQuery,
  useWarehouseCreateMutation,
  useWarehouseDeleteMutation,
  useWarehouseUpdateMutation,
} = warehouseApi;
