import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
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
    }),
    planCancel: builder.mutation({
      query: () => ({
        url: endpoints.plans.cancel,
        method: 'DELETE',
      }),
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
