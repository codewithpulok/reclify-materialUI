import { createApi } from '@reduxjs/toolkit/query/react';
import { warehouses } from 'src/assets/dummy';
import { publicBaseQuery } from '../utills';

// ********* Transform warehouse for testing perpuos *********** // TODO: REMOVE THIS
const transformWarehouse = (warehouse) => {
  if (!warehouse?.photos?.length) {
    warehouse.photos = [...Array(3)].map((v, i) => ({
      id: i,
      title: `Untitled ${i}`,
      link: `https://picsum.photos/seed/${warehouse.id}${i}/450/318`,
    }));
  }

  if (!warehouse?.address?.country) {
    warehouse.address = warehouses[Math.floor(Math.random() * warehouses.length)].address;
  }

  return warehouse;
};

export const warehouseApi = createApi({
  reducerPath: 'warehouseApi',
  baseQuery: publicBaseQuery('/warehouses'),
  endpoints: (builder) => ({
    warehouse: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response, meta, arg) => {
        /** @type {Warehouse} */
        const resWarehouse = { ...response }.results;

        const newWarehouse = transformWarehouse(resWarehouse);

        response.results = newWarehouse;

        return response;
      },
    }),
    warehouseList: builder.query({
      query: () => '/',
      transformResponse: (response, meta, arg) => {
        /** @type {Warehouse[]} */
        const resWarehouses = { ...response }.results;

        const newWarehouses = resWarehouses.map((warehouse) => transformWarehouse(warehouse));

        response.results = newWarehouses;

        return response;
      },
    }),
    warehouseOwnList: builder.query({
      query: () => '/own',
      transformResponse: (response, meta, arg) => {
        /** @type {Warehouse[]} */
        const resWarehouses = { ...response }.results;

        const newWarehouses = resWarehouses.map((warehouse) => transformWarehouse(warehouse));

        response.results = newWarehouses;

        return response;
      },
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
          // update the own waehouse list cache
          dispatch(
            warehouseApi.util.updateQueryData('warehouseOwnList', undefined, (draft) => {
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
