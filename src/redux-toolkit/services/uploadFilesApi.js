import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const uploadFilesApi = createApi({
  reducerPath: 'uploadFilesApi',
  baseQuery: publicBaseQuery(endpoints.file_upload.root),
  endpoints: (builder) => ({
    filesUpload: builder.mutation({
      query: (files = []) => {
        const bodyFormData = new FormData();
        files.forEach((file) => bodyFormData.append('files', file));

        return {
          url: endpoints.file_upload.create,
          method: 'POST',
          body: bodyFormData,
        };
      },
    }),
    fileDelete: builder.mutation({
      query: (id) => ({
        url: endpoints.file_upload.delete(id),
        method: 'DELETE',
      }),
    }),
    fileGet: builder.query({
      query: (id) => ({
        url: endpoints.file_upload.get(id),
      }),
    }),
    filesList: builder.query({
      query: () => ({
        url: endpoints.file_upload.list,
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
