import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: publicBaseQuery(endpoints.service.root),
  endpoints: (builder) => ({
    getOwnService: builder.query({
      query: () => endpoints.service.own,
    }),
    getService: builder.query({
      query: (id) => endpoints.service.get(id),
    }),
    listServices: builder.query({
      query: () => endpoints.service.list,
    }),
    updateOwnService: builder.mutation({
      query: (data) => ({
        url: endpoints.service.updateOwn,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOwnServiceQuery,
  useGetServiceQuery,
  useLazyGetOwnServiceQuery,
  useLazyGetServiceQuery,
  useLazyListServicesQuery,
  useListServicesQuery,
  useUpdateOwnServiceMutation,
} = serviceApi;
