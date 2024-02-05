import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { updateAuthState } from 'src/utils/auth-persist';
import { update } from '../features/auth/authSlice';
import { publicBaseQuery } from '../utills';

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: publicBaseQuery(endpoints.plans.root),
  endpoints: (builder) => ({
    planList: builder.query({
      query: () => endpoints.plans.list,
    }),
    planGet: builder.query({
      query: (id) => endpoints.plans.get(id),
    }),
    planUpgrade: builder.mutation({
      query: (id) => ({
        url: endpoints.plans.upgrade(id),
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // prepare changes
          const changes = {
            planId: data?.results?.planId,
          };

          // update session
          const authResponse = await updateAuthState(null, changes);
          // update local state
          dispatch(update(authResponse.user));
        } catch (error) {
          console.error('ERROR:Plan id cache update', error);
        }
      },
    }),
    planCancel: builder.mutation({
      query: () => ({
        url: endpoints.plans.cancel,
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // prepare changes
          const changes = {
            planId: data?.results?.planId,
          };

          // update session
          const authResponse = await updateAuthState(null, changes);
          // update local state
          dispatch(update(authResponse.user));
        } catch (error) {
          console.error('ERROR:Plan id cache cancel', error);
        }
      },
    }),
  }),
});

export const {
  useLazyPlanGetQuery,
  useLazyPlanListQuery,
  usePlanCancelMutation,
  usePlanGetQuery,
  usePlanListQuery,
  usePlanUpgradeMutation,
} = planApi;
