import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: publicBaseQuery(endpoints.users.root),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => endpoints.users.get(id),
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery } = usersApi;
