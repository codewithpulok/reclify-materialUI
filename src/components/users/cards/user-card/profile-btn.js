'use client';

import { Chip, Link } from '@mui/material';
import PropTypes from 'prop-types';
import useAdminPath from 'src/hooks/use-admin-path';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

/**
 * @param {ProfileBtn.propTypes} props
 * @returns {JSX.Element}
 */
const ProfileBtn = (props) => {
  const { user, type } = props;
  const userPath = useAdminPath(paths.dashboard.users[type], paths.users[type]);

  return (
    <Link
      component={RouterLink}
      sx={{ width: { xs: '100%', sm: 'auto' } }}
      href={userPath(user?.id)}
    >
      <Chip
        sx={{ width: { xs: '100%', sm: 'auto' } }}
        label=" Visit profile"
        color="primary"
        clickable
      />
    </Link>
  );
};

ProfileBtn.propTypes = {
  /** @type {UserType} */
  type: PropTypes.string,
  /** @type {User} */
  user: PropTypes.object,
};

export default ProfileBtn;
