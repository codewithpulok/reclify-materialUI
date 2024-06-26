import { Avatar, Box, Card, Stack, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PLACEHOLDER_PROFILE_AVATAR } from 'src/config-global';
import { fShortenNumber } from 'src/utils/format-number';
import { ICONS } from '../../config-users';
import CardActions from './card-actions';
import CardWrapper from './card-wrapper';

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

  const showActions = !!onVerify || !!onUnverify;
  const avatar = user?.avatar || PLACEHOLDER_PROFILE_AVATAR;
  const isServiceSeller = user?.serviceType !== 'warehouse';

  return (
    <Card sx={{ borderRadius: 1 }}>
      <CardWrapper user={user}>
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
      </CardWrapper>

      {showActions && <CardActions onUnverify={onUnverify} onVerify={onVerify} user={user} />}
    </Card>
  );
};

SellerCard.propTypes = Props;

export default SellerCard;
