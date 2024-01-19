import { createApi } from '@reduxjs/toolkit/query/react';
import { publicBaseQuery } from '../utills';

export const uploadFilesApi = createApi({
  reducerPath: 'uploadFilesApi',
  baseQuery: publicBaseQuery('/upload/files'),
  endpoints: (builder) => ({
    filesUpload: builder.mutation({
      query: (files = []) => {
        const bodyFormData = new FormData();
        files.forEach((file) => bodyFormData.append('files', file));

        return {
          url: '/',
          method: 'POST',
          body: bodyFormData,
        };
      },
    }),
    fileDelete: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    fileGet: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    filesList: builder.query({
      query: () => ({
        url: `/`,
      }),
    }),
  }),
});

export const {
  useFileGetQuery,
  useFileDeleteMutation,
  useFilesListQuery,
  useFilesUploadMutation,
  useLazyFileGetQuery,
  useLazyFilesListQuery,
} = uploadFilesApi;
