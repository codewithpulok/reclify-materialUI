import { Card, CardContent, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { removeProtocol } from 'src/utils/format-url';

/**
 * @param {InfoPart.propTypes} props
 * @returns {JSX.Element}
 */
const InfoPart = (props) => {
  const { user } = props;
  return (
    <Card>
      <CardContent component={Stack} spacing={2}>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Company Name:</Typography>
          <Typography variant="body2">{user?.company || ''}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Website:</Typography>
          {user?.website && <Link href={user?.website}>{removeProtocol(user?.website)}</Link>}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Phone Number:</Typography>
          <Typography variant="body2">{user?.phone || ''}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Email:</Typography>
          <Typography variant="body2">{user?.email || ''}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

InfoPart.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default InfoPart;
