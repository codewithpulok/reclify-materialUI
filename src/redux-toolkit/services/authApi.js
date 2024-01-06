import { createApi } from '@reduxjs/toolkit/query/react';
import { login, logout } from '../features/auth/authSlice';
import { publicBaseQuery } from '../utills';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: publicBaseQuery('/auth'),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data.results.data));
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data.results.data));
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
