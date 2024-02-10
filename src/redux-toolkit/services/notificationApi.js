import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/api/client';
import { publicBaseQuery } from '../utills';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: publicBaseQuery(endpoints.notification.root),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => endpoints.notification.list,
    }),
    readNotification: builder.mutation({
      query: (id) => ({
        url: endpoints.notification.read(id),
        method: 'PUT',
      }),
    }),
    readAllNotification: builder.mutation({
      query: () => ({
        url: endpoints.notification.read_all,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} = notificationApi;
