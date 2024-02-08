import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { updateAuthState } from 'src/utils/auth-persist';
import { update } from '../features/auth/authSlice';
import { publicBaseQuery } from '../utills';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: publicBaseQuery(endpoints.profile.root),
  endpoints: (builder) => ({
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: endpoints.profile.update,
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // prepare changes
          const changes = {
            firstName: data?.results?.firstName,
            avatar: data?.results?.avatar,
            lastName: data?.results?.lastName,
            serviceType: data?.results?.serviceType,
            email: data?.results?.email,
          };

          // update session
          const authResponse = await updateAuthState(null, changes);
          // update local state
          dispatch(update(authResponse.user));
        } catch (error) {
          console.error('Update Cache Warehouse Verified Error:', error);
        }
      },
    }),
    profileGet: builder.query({
      query: () => ({
        url: endpoints.profile.get,
      }),
    }),
  }),
});

export const { useLazyProfileGetQuery, useProfileGetQuery, useProfileUpdateMutation } = profileApi;
