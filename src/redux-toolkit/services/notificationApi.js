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
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.success) throw response;

          dispatch(
            notificationApi.util.updateQueryData('getNotifications', undefined, (draft) => {
              if (Array.isArray(draft?.results)) {
                const itemIndex = draft.results.findIndex((n) => n?.id === arg);
                if (itemIndex !== -1) draft.results[itemIndex].isRead = true;
              }
            })
          );
        } catch (error) {
          console.error('ERROR:Notification cache update error', error);
        }
      },
    }),
    readAllNotification: builder.mutation({
      query: () => ({
        url: endpoints.notification.read_all,
        method: 'PUT',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const { data } = response;

          if (!data?.success) throw response;

          dispatch(
            notificationApi.util.updateQueryData('getNotifications', undefined, (draft) => {
              if (Array.isArray(draft?.results)) {
                draft.results.forEach((n, i) => {
                  draft.results[i].isRead = true;
                });
              }
            })
          );
        } catch (error) {
          console.error('ERROR:Notification cache update error', error);
        }
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} = notificationApi;
