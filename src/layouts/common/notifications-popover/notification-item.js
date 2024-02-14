import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import NotificationActions from 'src/components/notification/actions';
import { ICONS } from 'src/layouts/config-layout';
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

/**
 * @param {NotificationTypeOptions} type
 */
const getNotificationIcon = (type) => {
  switch (type) {
    case 'ADMIN_APPROVE':
      return ICONS.admin_approve;
    case 'VERIFY_EMAIL':
      return ICONS.verify_email;
    case 'CUSTOMER_PURCHASE':
      return ICONS.customer_purchase;
    case 'CUSTOMER_TRANSACTION_CANCEL':
      return ICONS.customer_cancel;
    case 'ADMIN_TRANSACTION_CANCEL':
      return ICONS.admin_cancel;
    case 'SELLER_TRANSACTION_CANCEL':
      return ICONS.seller_cancel;
    default:
      return ICONS.notification;
  }
};

// ----------------------------------------------------------------------

const Props = {
  /** @type {NotificationType} */
  notification: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NotificationItem = (props) => {
  const { notification } = props;

  const renderThumbnail = (
    <ListItemAvatar>
      {notification?.thumbnail ? (
        <Avatar src={notification.thumbnail} sx={{ bgcolor: 'background.neutral' }} />
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: 'background.neutral',
          }}
        >
          {getNotificationIcon(notification.type)(24)}
        </Stack>
      )}
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(notification.message)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fToNow(notification.createdAt)}
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.isRead && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {renderUnReadBadge}

      {renderThumbnail}

      <Stack sx={{ flexGrow: 1 }} spacing={1.5}>
        {renderText}

        <Stack direction="row" spacing={0.5}>
          <NotificationActions notification={notification} />
        </Stack>
      </Stack>
    </ListItemButton>
  );
};

NotificationItem.propTypes = Props;
export default NotificationItem;

// ----------------------------------------------------------------------

function reader(data) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
