import { Avatar, Box, Card, CardActionArea, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { PLACEHOLDER_PROFILE_AVATAR } from 'src/config-global';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import { fShortenNumber } from 'src/utils/format-number';
import { ICONS } from '../config-users';

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
  const router = useRouter();
  const { user: authUser } = useAppSelector(selectAuth);

  const customerPath =
    authUser?.userType === 'admin' ? paths.dashboard.users.customer : paths.users.customer;

  const avatar = user?.avatar || PLACEHOLDER_PROFILE_AVATAR;

  return (
    <Card sx={{ borderRadius: 1 }}>
      <CardActionArea
        onClick={() => router.push(customerPath(user.id))}
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
      </CardActionArea>
    </Card>
  );
};

CustomerCard.propTypes = Props;

export default CustomerCard;
