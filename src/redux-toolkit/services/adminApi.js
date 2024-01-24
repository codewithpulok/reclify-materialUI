import { createApi } from '@reduxjs/toolkit/query/react';
import { publicBaseQuery } from '../utills';
import { warehouseApi } from './warehouseApi';

const updateWarehoueCache = (dispatch, arg = {}, updates = {}) => {
  // update the waehouse list cache
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', undefined, (draft) => {
      const updateIndex = draft.results.findIndex((w) => w.id === arg.id);
      if (updateIndex === -1) return;

      const warehouse = { ...draft.results[updateIndex], ...updates };

      console.log({ warehouse, updateIndex });

      draft.results[updateIndex] = warehouse;
    })
  );

  // update the individual warehouse cache
  dispatch(
    warehouseApi.util.updateQueryData('warehouse', arg.id, (draft) => {
      const warehouse = { ...draft.results, ...updates };
      draft.results = warehouse;
    })
  );
};

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: publicBaseQuery('/admin'),
  endpoints: (builder) => ({
    updateWarehouseVerified: builder.mutation({
      query: ({ id, isVerified }) => ({
        url: `/warehouse/${id}`,
        body: { isVerified },
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          updateWarehoueCache(dispatch, arg, { isVerified: arg.isVerified });
        } catch (error) {
          console.error('Update Cache Warehouse Verified Error:', error);
        }
      },
    }),
    updateWarehouseFeatured: builder.mutation({
      query: ({ id, isFeatured }) => ({
        url: `/warehouse/${id}`,
        body: { isFeatured },
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          updateWarehoueCache(dispatch, arg, { isFeatured: arg.isFeatured });
        } catch (error) {
          console.error('Update Cache Warehouse Featured Error:', error);
        }
      },
    }),
    updateWarehouseDiamond: builder.mutation({
      query: ({ id, diamond }) => ({
        url: `/warehouse/${id}`,
        body: { diamond },
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          updateWarehoueCache(dispatch, arg, { diamond: arg.diamond });
        } catch (error) {
          console.error('Update Cache Warehouse Diamond Error:', error);
        }
      },
    }),
    updateWarehouseVisible: builder.mutation({
      query: ({ id, visible }) => ({
        url: `/warehouse/${id}`,
        body: { visible },
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          updateWarehoueCache(dispatch, arg, { visible: arg.visible });
        } catch (error) {
          console.error('Update Cache Warehouse Diamond Error:', error);
        }
      },
    }),
  }),
});

export const {
  useUpdateWarehouseDiamondMutation,
  useUpdateWarehouseFeaturedMutation,
  useUpdateWarehouseVerifiedMutation,
  useUpdateWarehouseVisibleMutation,
} = adminApi;
