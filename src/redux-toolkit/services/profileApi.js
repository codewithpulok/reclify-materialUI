import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
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
    }),
    profileGet: builder.query({
      query: () => ({
        url: endpoints.profile.get,
      }),
    }),
  }),
});

export const { useLazyProfileGetQuery, useProfileGetQuery, useProfileUpdateMutation } = profileApi;
