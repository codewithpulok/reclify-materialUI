import { Avatar, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { ICONS } from '../../config-settings';

const TransactionUserProps = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};
/**
 * @param {TransactionUserProps} props
 * @returns {JSX.Element}
 */
const TransactionUser = (props) => {
  const { user } = props;
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 1 }}
      alignItems="center"
    >
      <Avatar src={user.photoURL} alt={user.displayName} sx={{ width: 60, height: 60 }} />
      <Stack>
        <Typography variant="h6" mb={0.8}>
          {user.displayName}
        </Typography>
        <Stack flexDirection="row" spacing={0.5}>
          <Chip
            icon={ICONS.phone()}
            label="Phone"
            component={Link}
            href={`tel:${user.phoneNumber}`}
            sx={{ borderRadius: 0.5 }}
            size="small"
            color="primary"
            variant="outlined"
            clickable
          />
          <Chip
            icon={ICONS.email()}
            label="Email"
            component={Link}
            href={`mailto:${user.email}`}
            sx={{ borderRadius: 0.5 }}
            size="small"
            color="primary"
            variant="outlined"
            clickable
          />
        </Stack>
      </Stack>

      <Chip
        label={user.role}
        color="primary"
        size="small"
        sx={{ fontSize: 13, alignSelf: 'self-start', ml: 'auto' }}
      />
    </Stack>
  );
};

TransactionUser.propTypes = TransactionUserProps;

export default TransactionUser;
