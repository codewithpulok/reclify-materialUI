import { Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
// local components
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

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
      alignItems="center"
    >
      <Avatar src={customer.avatar} alt={customer.displayName} sx={{ width: 60, height: 60 }} />
      <Stack>
        <Typography variant="h6" mb={0.8}>
          {customer.displayName}
        </Typography>
        <Stack flexDirection="row" spacing={0.5}>
          <Typography
            component={RouterLink}
            href={`mailto:${customer.email}`}
            variant="body2"
            color="text.secondary"
          >
            {customer.email}
          </Typography>
          <Typography
            component={RouterLink}
            href={`tel:${customer.phoneNumber}`}
            variant="body2"
            color="text.secondary"
          >
            {customer.phoneNumber}
          </Typography>

          <Stack mt={2} direction="row" spacing={0.3}>
            <Link
              component={RouterLink}
              href={`${paths.dashboard.messages.root}?id=${customer.id}`}
            >
              <Label color="info">send a message</Label>
            </Link>
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
