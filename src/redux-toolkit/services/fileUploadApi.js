import { createApi } from '@reduxjs/toolkit/query/react';
import { publicBaseQuery } from '../utills';

export const fileUploadApi = createApi({
  reducerPath: 'fileUploadApi',
  baseQuery: publicBaseQuery('/file-upload'),
  endpoints: (builder) => ({
    fileCreate: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/',
          body: formData,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          formData: true,
        };
      },
    }),
    fileDelete: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFileCreateMutation, useFileDeleteMutation } = fileUploadApi;
