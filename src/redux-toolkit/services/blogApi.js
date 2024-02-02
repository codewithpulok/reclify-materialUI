import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: publicBaseQuery(endpoints.blogs.root),
  endpoints: (builder) => ({
    blogList: builder.query({
      query: () => endpoints.blogs.list,
    }),
    blogGet: builder.query({
      query: (id) => endpoints.blogs.get(id),
    }),
    blogCreate: builder.mutation({
      query: (data) => ({
        url: endpoints.blogs.create,
        body: data,
        method: 'POST',
      }),
    }),
    blogUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.blogs.update(id),
        body: data,
        method: 'PUT',
      }),
    }),
    blogDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.blogs.delete(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useBlogCreateMutation,
  useBlogDeleteMutation,
  useBlogGetQuery,
  useBlogListQuery,
  useBlogUpdateMutation,
  useLazyBlogGetQuery,
  useLazyBlogListQuery,
} = blogApi;
