import { createApi } from '@reduxjs/toolkit/query/react';
import { usRegions } from 'src/assets/data';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';
import { transactionApi } from './transactionApi';
import { warehouseApi } from './warehouseApi';

// update warehouse list cache
const updateWarehouseCache = (dispatch, arg = {}, updates = {}) => {
  // list cache update handler
  const updateListCache = (draft) => {
    const updateIndex = draft.results.findIndex((w) => w.id === arg.id);
    if (updateIndex === -1) return;

    const warehouse = { ...draft.results[updateIndex], ...updates };

    draft.results[updateIndex] = warehouse;
  };

  // update the warehouse list cache
  dispatch(warehouseApi.util.updateQueryData('warehouseList', undefined, updateListCache));

  // update regions cache
  usRegions.forEach((region) => {
    dispatch(
      warehouseApi.util.updateQueryData('warehouseList', { region: region.code }, updateListCache)
    );
  });

  // update the individual warehouse cache
  dispatch(
    warehouseApi.util.updateQueryData('warehouse', arg.id, (draft) => {
      const warehouse = { ...draft.results, ...updates };
      draft.results = warehouse;
    })
  );
};

// update visible warehouses
const updateVisibleCache = (dispatch, arg = {}, updates = {}) => {
  // update invisible api cache (ADMIN)
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', { visible: false }, (draft) => {
      if (!Array.isArray(draft?.results)) return; // check is results valid or not

      if (arg?.visible === true) {
        const filtered = draft.results.filter((w) => w.id !== arg.id); // remove warehouse from the cache
        draft.results = filtered;
      }
    })
  );

  const removeInvisible = (draft) => {
    if (!Array.isArray(draft?.results)) return; // check is results valid or not

    if (arg?.visible === false) {
      const filtered = draft.results.filter((w) => w.id !== arg.id); // remove warehouse from the cache
      draft.results = filtered;
    }
  };

  // update not rated api cache (ADMIN)
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', { hasDiscount: false }, removeInvisible)
  );

  // update not verified api cache (ADMIN)
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', { verified: false }, removeInvisible)
  );

  // update not featured api cache (ADMIN)
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', { featured: false }, removeInvisible)
  );
};

// update featured warehouses
const updateFeaturedCache = (dispatch, arg = {}, updates = {}) => {
  // update not featured api cache (ADMIN)
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', { featured: false }, (draft) => {
      if (!Array.isArray(draft?.results)) return; // check is results valid or not

      if (arg?.isFeatured === true) {
        const filtered = draft.results.filter((w) => w.id !== arg.id); // remove warehouse from the cache
        draft.results = filtered;
      }
    })
  );
};

// update verified warehouses
const updateVerifiedCache = (dispatch, arg = {}, updates = {}) => {
  // update not verified api cache (ADMIN)
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', { verified: false }, (draft) => {
      if (!Array.isArray(draft?.results)) return; // check is results valid or not

      if (arg?.isVerified === true) {
        const filtered = draft.results.filter((w) => w.id !== arg.id); // remove warehouse from the cache
        draft.results = filtered;
      }
    })
  );
};

// update diamond warehouses
const updateDiamondCache = (dispatch, arg = {}, updates = {}) => {
  // update not rated api cache (ADMIN)
  dispatch(
    warehouseApi.util.updateQueryData('warehouseList', { hasDiscount: false }, (draft) => {
      if (!Array.isArray(draft?.results)) return; // check is results valid or not

      if (arg?.diamond > 0) {
        const filtered = draft.results.filter((w) => w.id !== arg.id); // remove warehouse from the cache
        draft.results = filtered;
      }
    })
  );
};

// update transaction status cache
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
          const response = await queryFulfilled;

          updateWarehouseCache(dispatch, arg, { isVerified: arg.isVerified });
          updateVerifiedCache(dispatch, arg, response?.data?.results);
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
          const response = await queryFulfilled;

          updateFeaturedCache(dispatch, arg, response?.data?.results);
          updateWarehouseCache(dispatch, arg, { isFeatured: arg.isFeatured });
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
          const response = await queryFulfilled;

          updateWarehouseCache(dispatch, arg, { diamond: arg.diamond });
          updateDiamondCache(dispatch, arg, response?.data?.results);
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
          const response = await queryFulfilled;

          updateWarehouseCache(dispatch, arg, { visible: arg.visible });
          updateVisibleCache(dispatch, arg, response?.data?.results);
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
