import { Card, CardContent, Link, Stack, Typography } from '@mui/material';
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
          <Typography variant="subtitle2">Location:</Typography>
          <Typography variant="body2">{user?.address?.country || ''}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Website:</Typography>
          {user?.website && <Link href={user?.website}>{removeProtocol(user?.website)}</Link>}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Type of Goods:</Typography>
          <Typography variant="body2">{user?.goods || ''}</Typography>
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
