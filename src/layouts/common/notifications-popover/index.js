import { m } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { varHover } from 'src/components/common/animate';
import Iconify from 'src/components/common/iconify';
import Label from 'src/components/common/label';
import Scrollbar from 'src/components/common/scrollbar';

import { LoadingState } from 'src/components/common/custom-state';
import {
  useGetNotificationsQuery,
  useReadAllNotificationMutation,
} from 'src/redux-toolkit/services/notificationApi';
import NotificationItem from './notification-item';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  // theme state
  const smUp = useResponsive('up', 'sm');

  // logic state
  const drawer = useBoolean();
  const [currentTab, setCurrentTab] = useState('all');

  // api state
  const notificationResponse = useGetNotificationsQuery();
  const totalUnRead = useMemo(
    () => (notificationResponse?.data?.results || []).filter((n) => n?.isRead === false).length,
    [notificationResponse?.data?.results]
  );
  const totalRead = useMemo(
    () => (notificationResponse?.data?.results || []).filter((n) => n?.isRead).length,
    [notificationResponse?.data?.results]
  );
  const [readAllNotification, readAllResponse] = useReadAllNotificationMutation();

  // app state
  const [notifications, setNotifications] = useState([]);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notifications
      </Typography>

      {!!totalUnRead && (
        <Tooltip title="Mark all as read">
          <IconButton
            color="primary"
            onClick={readAllNotification}
            disabled={readAllResponse.isLoading}
          >
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  // tabs config
  const TABS = useMemo(
    () => [
      {
        value: 'all',
        label: 'All',
        count: notificationResponse?.data?.results?.length || 0,
      },
      {
        value: 'unread',
        label: 'Unread',
        color: 'info',
        count: totalUnRead || 0,
      },
      {
        value: 'archived',
        label: 'Archived',
        color: 'success',
        count: totalRead || 0,
      },
    ],
    [notificationResponse?.data?.results?.length, totalRead, totalUnRead]
  );

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label variant={tab.value === currentTab ? 'filled' : 'soft'} color={tab?.color}>
              {tab.count}
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </List>
    </Scrollbar>
  );

  // update notificaitons based on tab, api response
  useEffect(() => {
    if (notificationResponse?.isSuccess && Array.isArray(notificationResponse?.data?.results)) {
      switch (currentTab) {
        case 'unread':
          setNotifications(notificationResponse.data.results.filter((n) => n?.isRead === false));
          break;
        case 'archived':
          setNotifications(notificationResponse.data.results.filter((n) => n?.isRead));
          break;
        default:
          setNotifications(notificationResponse.data.results);
          break;
      }
    }
  }, [currentTab, notificationResponse?.data?.results, notificationResponse?.isSuccess]);

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
        </Stack>

        <Divider />

        {notificationResponse.isLoading && <LoadingState />}
        {notificationResponse?.isSuccess && renderList}
      </Drawer>
    </>
  );
}
