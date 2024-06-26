import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { updateAuthState } from 'src/utils/auth-persist';
import { update } from '../features/auth/authSlice';
import { publicBaseQuery } from '../utills';
import { billingApi } from './billingApi';

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: publicBaseQuery(endpoints.plans.root),
  endpoints: (builder) => ({
    planList: builder.query({
      query: () => endpoints.plans.list,
    }),
    planGet: builder.query({
      query: ({ id, userId }) => ({
        url: endpoints.plans.get(id),
        params: {
          userId: userId || undefined,
        },
      }),
    }),
    planUpgrade: builder.mutation({
      query: (
        /** @type {{id: string, annualPlan: boolean}} */
        { id, annualPlan }
      ) => ({
        url: endpoints.plans.upgrade(id),
        method: 'PUT',
        params: {
          annualPlan: annualPlan || false,
        },
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

          // update billing api
          dispatch(
            billingApi.util.updateQueryData('getBilling', undefined, (draft) => {
              if (draft.results) draft.results.annualPlan = !!arg?.annualPlan;
            })
          );
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
