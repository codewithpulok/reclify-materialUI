import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import { PLACEHOLDER_PROFILE_AVATAR } from 'src/config-global';
import useAdminPath from 'src/hooks/use-admin-path';
import { paths } from 'src/routes/paths';
import { fShortenNumber } from 'src/utils/format-number';
import { ICONS } from '../config-users';

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  serviceCount: PropTypes.number.isRequired,
  onVerify: PropTypes.func,
  onUnverify: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SellerCard = (props) => {
  const { user, serviceCount, onVerify, onUnverify } = props;
  const router = useRouter();
  const popover = usePopover();
  const showActions = !!onVerify || !!onUnverify;

  const sellerPath = useAdminPath(paths.dashboard.users.seller, paths.users.seller);
  const avatar = user?.avatar || PLACEHOLDER_PROFILE_AVATAR;

  const isServiceSeller = user?.serviceType !== 'warehouse';

  const renderMenu = (
    <CustomPopover
      open={popover.open}
      onClose={popover.onClose}
      arrow="top-right"
      sx={{ width: 150 }}
    >
      {onVerify && !user?.isVerified && (
        <MenuItem onClick={() => onVerify(user)}>Verify Seller</MenuItem>
      )}
      {onUnverify && user?.isVerified && (
        <MenuItem onClick={() => onUnverify(user)}>Unverify Seller</MenuItem>
      )}
    </CustomPopover>
  );

  return (
    <Card sx={{ borderRadius: 1 }}>
      <CardActionArea
        onClick={() => router.push(sellerPath(user.id))}
        sx={{ minHeight: '100%', px: { xs: 1, sm: 1.5 }, py: { xs: 1, sm: 1.2 } }}
      >
        <Stack direction="row" spacing={1.5} mb={2} alignItems="center">
          <Box>
            <Avatar
              src={avatar}
              alt={user?.firstName}
              sx={{ borderRadius: 100, width: '60px', height: '60px' }}
            />
          </Box>
          <Stack sx={{ flex: 1, width: '100%' }}>
            <Stack direction="row" alignItems="center" gap={0.3}>
              <Typography variant="body1">
                {user?.firstName} {user?.lastName}
              </Typography>

              {user?.isVerified ? (
                <Tooltip title="Verified" placement="top" arrow>
                  {ICONS.verified(16, { color: 'primary.main' })}
                </Tooltip>
              ) : null}
            </Stack>

            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ bgcolor: 'background.neutral', px: 0.5, py: 0.25, borderRadius: 0.5 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            {ICONS.warehouse(16, { color: 'primary.main' })}
            <Typography variant="body2">
              {fShortenNumber(serviceCount) || 0}{' '}
              {serviceCount > 1 ? (
                <>{isServiceSeller ? 'services' : 'warehouses'}</>
              ) : (
                <>{isServiceSeller ? 'service' : 'warehouse'}</>
              )}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>

      {showActions && (
        <Stack direction="row" justifyContent="end" sx={{ position: 'absolute', top: 5, right: 5 }}>
          <IconButton size="small" onClick={popover.onOpen}>
            {ICONS.settings()}
          </IconButton>
        </Stack>
      )}

      {renderMenu}
    </Card>
  );
};

SellerCard.propTypes = Props;

export default SellerCard;
