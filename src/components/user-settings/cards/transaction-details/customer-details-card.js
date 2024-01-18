import { Button, Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
// local components
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../../config-user-settings';

const CustomerDetailsCardProps = {
  /** @type {User} */
  customer: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * @param {CustomerDetailsCardProps} props
 * @returns {JSX.Element}
 */
const CustomerDetailsCard = (props) => {
  const { customer, sx = {} } = props;
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 1, ...sx }}
      alignItems="start"
    >
      <Avatar src={customer.avatar} alt={customer.displayName} sx={{ width: 60, height: 60 }} />
      <Stack>
        <Link component={RouterLink} href={`${paths.dashboard.users.customers}/${customer.id}`}>
          <Typography variant="h6" color="text.primary" mb={0.5}>
            {customer.displayName}
          </Typography>
        </Link>
        <Stack spacing={0}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {ICONS.phone(18, { color: 'secondary.main' })}
            <Link
              component={RouterLink}
              href={`tel:${customer.phoneNumber}`}
              typography="body2"
              color="text.secondary"
            >
              {customer.phoneNumber}
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {ICONS.email(18, { color: 'secondary.main' })}
            <Link
              component={RouterLink}
              href={`mailto:${customer.email}`}
              typography="body2"
              color="text.secondary"
            >
              {customer.email}
            </Link>
          </Stack>

          <Stack mt={1.5} direction="row" spacing={0.3}>
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.messages.root}?id=${customer.id}`}
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={ICONS.send_message()}
            >
              send a message
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Label variant="soft" color="primary" sx={{ alignSelf: 'self-start', ml: 'auto' }}>
        Customer
      </Label>
    </Stack>
  );
};

CustomerDetailsCard.propTypes = CustomerDetailsCardProps;

export default CustomerDetailsCard;
