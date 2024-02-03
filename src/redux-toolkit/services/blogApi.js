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
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            blogApi.util.updateQueryData('blogList', undefined, (draft) => {
              if (Array.isArray(draft?.results)) {
                draft.results?.push(data?.results);
              }
            })
          );
        } catch (error) {
          console.error('ERROR: Blog Cache update', error);
        }
      },
    }),
    blogUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: endpoints.blogs.update(id),
        body: data,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          // update list cache
          dispatch(
            blogApi.util.updateQueryData('blogList', undefined, (draft) => {
              const updateIndex = draft?.results?.findIndex((d) => d.id === arg?.id);
              if (updateIndex !== -1) draft.results[updateIndex] = data?.results;
            })
          );
        } catch (error) {
          console.error('ERROR: Blog Cache update', error);
        }
      },
    }),
    blogDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.blogs.delete(id),
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          // update list cache
          dispatch(
            blogApi.util.updateQueryData('blogList', undefined, (draft) => {
              const filtered = draft.results.filter((b) => b.id !== arg);
              draft.results = filtered;
            })
          );
        } catch (error) {
          console.error('ERROR: Blog Cache update', error);
        }
      },
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
