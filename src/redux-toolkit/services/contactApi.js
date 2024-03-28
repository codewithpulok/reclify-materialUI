import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: publicBaseQuery(endpoints.contact_us.root),
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: endpoints.contact_us.create,
        body: data,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
