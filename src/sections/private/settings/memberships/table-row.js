import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Chip, Link, Typography } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  /** @type {Plan} */
  plan: PropTypes.object.isRequired,
};

/**
 * Transection Table Row UI
 * @param {Props} props
 * @returns
 */
const MembershipTableRow = (props) => {
  const { plan, user } = props;

  const renderPrimary = (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={user.displayName} src={user.avatar} sx={{ mr: 2 }} />
          <Stack>
            <Link component={RouterLink} href={`${paths.dashboard.users.sellers}/${user.id}`}>
              <Typography variant="body1" color="text.primary">
                {user.displayName}
              </Typography>
            </Link>
            <Link component={RouterLink} href={`mailto:${user.email}`}>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        {!plan && <Chip label="None" />}
        {plan && <Chip label={plan.subscription} color="primary" />}
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
};

MembershipTableRow.propTypes = Props;

export default MembershipTableRow;
