import { createApi } from '@reduxjs/toolkit/query/react';
import { publicBaseQuery } from '../utills';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: publicBaseQuery('/profile'),
  endpoints: (builder) => ({
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: '/',
        body: data,
        method: 'PUT',
      }),
    }),
    profileGet: builder.query({
      query: () => ({
        url: `/`,
      }),
    }),
  }),
});

export const { useLazyProfileGetQuery, useProfileGetQuery, useProfileUpdateMutation } = profileApi;
