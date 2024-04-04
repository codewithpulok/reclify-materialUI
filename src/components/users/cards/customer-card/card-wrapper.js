'use client';

import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import useAdminPath from 'src/hooks/use-admin-path';
import { paths } from 'src/routes/paths';

/**
 * @param {CardWrapper.propTypes} props
 * @returns {JSX.Element}
 */
const CardWrapper = (props) => {
  const { children, user } = props;

  const router = useRouter();
  const customerPath = useAdminPath(paths.dashboard.users.customer, paths.users.customer);

  return (
    <CardActionArea
      onClick={() => router.push(customerPath(user.id))}
      sx={{ minHeight: '100%', px: { xs: 1, sm: 1.5 }, py: { xs: 1, sm: 1.2 } }}
    >
      {children}
    </CardActionArea>
  );
};

CardWrapper.propTypes = {
  children: PropTypes.node,
  /** @type {User} */
  user: PropTypes.object,
};

export default CardWrapper;
