import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { getAuthState, removeAuthState, saveAuthState } from 'src/utils/auth-persist';
import { login, logout } from '../features/auth/authSlice';
import { publicBaseQuery } from '../utills';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: publicBaseQuery(endpoints.auth.root),
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
      query: (data) => ({
        url: endpoints.auth.login,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.isError) throw new Error(data?.message);

          const state = await saveAuthState(data.results?.token, data?.results?.data);

          dispatch(login(state));
        } catch (error) {
          console.error(error);
          dispatch(logout());
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.register,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.isError) throw new Error(data?.message);
          const state = await saveAuthState(data.results?.token, data.results?.data);
          dispatch(login(state));
        } catch (error) {
          console.error(error);
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
    updatePassword: builder.mutation({
      /** @type {(data: {email: string, newPassword: string, currentPassword: string}) => {}} */
      query: (data) => ({
        url: endpoints.auth.password.change,
        body: data,
        method: 'PUT',
      }),
    }),
    forgotPassword: builder.mutation({
      /** @type {(data: {email: string}) => {}} */
      query: (data) => ({
        url: endpoints.auth.password.forgot,
        body: data,
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation({
      /** @type {(data: {token: string, newPassword: string}) => {}} */
      query: (data) => ({
        url: endpoints.auth.password.reset,
        body: data,
        method: 'PUT',
      }),
    }),
    emailVerify: builder.mutation({
      /** @type {(data: {token: string}) => {}} */
      query: (data) => ({
        url: endpoints.auth.email.verify,
        body: data,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useInitAuthMutation,
  useLogoutMutation,
  useUpdatePasswordMutation,
  useEmailVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
