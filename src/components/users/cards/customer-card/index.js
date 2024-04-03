import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PLACEHOLDER_PROFILE_AVATAR } from 'src/config-global';
import { fShortenNumber } from 'src/utils/format-number';
import { ICONS } from '../../config-users';
import CardWrapper from './card-wrapper';

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  totalTransactions: PropTypes.number.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CustomerCard = (props) => {
  const { user, totalTransactions = 0 } = props;

  const avatar = user?.avatar || PLACEHOLDER_PROFILE_AVATAR;

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
            <Typography variant="body1">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </Stack>
        </Stack>

        {!!totalTransactions && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ bgcolor: 'background.neutral', px: 0.5, py: 0.25, borderRadius: 0.5 }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              {ICONS.transactions(16, { color: 'primary.main' })}
              <Typography variant="body2">
                {fShortenNumber(totalTransactions) || 0} Transactions
              </Typography>
            </Stack>
          </Stack>
        )}
      </CardWrapper>
    </Card>
  );
};

CustomerCard.propTypes = Props;

export default CustomerCard;
