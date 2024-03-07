import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { updateAuthState } from 'src/utils/auth-persist';
import { update } from '../features/auth/authSlice';
import { publicBaseQuery } from '../utills';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: publicBaseQuery(endpoints.payment.root),
  endpoints: (builder) => ({
    refreshAccount: builder.query({
      query: () => endpoints.payment.account_refresh_url,
    }),
    onboarding: builder.mutation({
      query: (data) => ({
        url: endpoints.payment.onboarding,
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.isError) throw new Error(data?.message);

          const state = await updateAuthState(null, { stripeAccountCompleteStatus: true });
          dispatch(update(state));
        } catch (error) {
          console.error('Error: Update onboarding', error);
        }
      },
    }),
  }),
});

export const { useLazyRefreshAccountQuery, useRefreshAccountQuery, useOnboardingMutation } =
  paymentApi;
