import { createApi } from '@reduxjs/toolkit/query/react';
import { getAuthState, removeAuthState, saveAuthState } from 'src/utils/auth-persist';
import { login, logout } from '../features/auth/authSlice';
import { publicBaseQuery } from '../utills';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: publicBaseQuery('/auth'),
  endpoints: (builder) => ({
    initAuth: builder.mutation({
      queryFn: async () => {
        try {
          const authstate = await getAuthState();
          return { data: authstate };
        } catch (error) {
          return { error: error?.message };
        }
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
        } catch (error) {
          await removeAuthState();
          dispatch(logout());
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.isError) throw new Error(data?.message);
          const state = await saveAuthState(data.results?.token, data.results?.data);
          dispatch(login(state));
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
          if (data?.isError) throw new Error(data?.message);
          const state = await saveAuthState(data.results?.token, data.results?.data);
          dispatch(login(state));
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    logout: builder.mutation({
      queryFn: async () => {
        try {
          const data = await removeAuthState();
          return { data };
        } catch (error) {
          return { error: error?.message };
        }
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.log('Logout Error: ', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useInitAuthMutation, useLogoutMutation } =
  authApi;
