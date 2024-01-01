import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Label from 'src/components/common/label';
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
      alignItems="center"
    >
      <Avatar src={customer.photoURL} alt={customer.displayName} sx={{ width: 60, height: 60 }} />
      <Stack>
        <Typography variant="h6" mb={0.8}>
          {customer.displayName}
        </Typography>
        <Stack flexDirection="row" spacing={0.5}>
          <Chip
            icon={ICONS.phone()}
            label="Phone"
            component={Link}
            href={`tel:${customer.phoneNumber}`}
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
            href={`mailto:${customer.email}`}
            sx={{ borderRadius: 0.5 }}
            size="small"
            color="primary"
            variant="outlined"
            clickable
          />
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
