import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';
import { transactionApi } from './transactionApi';
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

const updateTransactionStatus = (dispatch, arg, value) => {
  dispatch(
    adminApi.util.updateQueryData('listTransaction', undefined, (draft) => {
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

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: publicBaseQuery(endpoints.admin.root),
  endpoints: (builder) => ({
    updateWarehouseVerified: builder.mutation({
      query: ({ id, isVerified }) => ({
        url: endpoints.admin.warehouse.update(id),
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
        url: endpoints.admin.warehouse.update(id),
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
        url: endpoints.admin.warehouse.update(id),
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
        url: endpoints.admin.warehouse.update(id),
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
    // users actions
    listSellers: builder.query({
      query: () => ({
        url: endpoints.admin.users.list,
        params: { userType: 'seller' },
      }),
    }),
    listCustomers: builder.query({
      query: () => ({
        url: endpoints.admin.users.list,
        params: { userType: 'customer' },
      }),
    }),
    getUser: builder.query({
      query: (id) => endpoints.admin.users.get(id),
    }),
    updateSeller: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.admin.users.update(id),
        method: 'PUT',
        body: data,
      }),
    }),
    // transaction actions
    listTransaction: builder.query({
      query: () => endpoints.admin.transaction.list,
    }),
    cancelTransaction: builder.mutation({
      query: (id) => ({
        url: endpoints.admin.transaction.cancel(id),
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.success) throw new Error(response);

          // update the transaction list cache
          updateTransactionStatus(dispatch, arg, 'cancelled');
        } catch (error) {
          console.error('Transction cache update error: ', error);
        }
      },
    }),
    approveTransaction: builder.mutation({
      query: (id) => ({
        url: endpoints.admin.transaction.approve(id),
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.success) throw new Error(response);

          // update the transaction list cache
          updateTransactionStatus(dispatch, arg, 'pending');
        } catch (error) {
          console.error('Transction cache update error: ', error);
        }
      },
    }),
    // plan
    upgradePlan: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.admin.plan.upgrade(id),
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.results) return;

          // update the user cache
          dispatch(
            adminApi.util.updateQueryData('getUser', arg?.id, (draft) => {
              if (draft.results?.membership !== undefined) {
                draft.results.membership = data.results;
                console.log(draft.resutls.membership);
              }
            })
          );
        } catch (error) {
          console.error('ERROR: User cache update', error);
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
  useLazyListCustomersQuery,
  useLazyListSellersQuery,
  useListCustomersQuery,
  useListSellersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useApproveTransactionMutation,
  useCancelTransactionMutation,
  useListTransactionQuery,
  useLazyListTransactionQuery,
  useUpgradePlanMutation,
  useUpdateSellerMutation,
} = adminApi;
