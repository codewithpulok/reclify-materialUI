'use client';

import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { ICONS } from 'src/components/users/config-users';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

/**
 * @param {MessageBtn.propTypes} props
 * @returns {JSX.Element}
 */
const MessageBtn = (props) => {
  const { user } = props;
  const { user: authUser } = useAppSelector(selectAuth);

  if (authUser?.id === user.id) return null;

  return (
    <Button
      LinkComponent={RouterLink}
      href={`${paths.dashboard.messages.root}?id=${user?.id}`}
      variant="contained"
      color="inherit"
      endIcon={ICONS.send_message()}
      sx={{
        alignSelf: {
          xs: 'center',
          md: 'end',
        },
        mr: {
          xs: 0,
          md: 2,
        },
        mb: 2,
        bgcolor: 'grey.0',
        color: 'grey.900',
        ':hover': { bgcolor: 'grey.300' },
      }}
    >
      Send Message
    </Button>
  );
};

MessageBtn.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default MessageBtn;
