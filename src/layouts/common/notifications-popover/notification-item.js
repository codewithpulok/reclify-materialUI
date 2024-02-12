import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { Button } from '@mui/material';
import { ICONS } from 'src/layouts/config-layout';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const TransactionAction = () => {
  const { user } = useAppSelector(selectAuth);

  const showApprove = user?.userType === 'seller';
  const showCancel = user?.userType === 'seller' || user?.userType === 'customer';

  return (
    <Stack direction="row">
      {showApprove && <Button variant="contained">Approve</Button>}
      {showCancel && <Button variant="outlined">Cancel</Button>}
    </Stack>
  );
};

const VerifyAction = () => (
  <Stack direction="row">
    <Button variant="contained" LinkComponent={RouterLink} href={paths.auth.email_verify}>
      Verify Email
    </Button>
  </Stack>
);

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
          {notification?.type === 'transaction' && ICONS.transaction(24)}
          {notification?.type === 'verify' && ICONS.verify(24)}
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

      <Stack sx={{ flexGrow: 1 }}>
        {renderText}

        {notification?.type === 'transaction' && <TransactionAction />}
        {notification?.type === 'verify' && <VerifyAction />}
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
