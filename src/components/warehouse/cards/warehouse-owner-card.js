import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
// local components
import Image from 'src/components/common/image';
import { ICONS } from '../config-warehouse';

const WarehouseOwnerCardProps = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {WarehouseOwnerCardProps} props
 * @returns {JSX.Element}
 */
const WarehouseOwnerCard = (props) => {
  const { user, sx } = props;
  return (
    <Card sx={{ px: 2, py: 2, ...sx }}>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: {
            xs: 'start',
            sm: 'center',
          },
        }}
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Box
          sx={{
            width: '90px',
          }}
        >
          <Image
            alt={user.displayName}
            src={user.photoURL}
            ratio="1/1"
            sx={{ borderRadius: 100 }}
          />
        </Box>
        <Box sx={{ width: '100%', flex: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.8}>
            <Typography variant="h6">{user.displayName}</Typography>

            <Chip label="Owner" color="primary" size="small" variant="outlined" />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {ICONS.email(18)}

            <Typography
              variant="body2"
              color="text.primary"
              sx={{ textDecoration: 'none' }}
              component={Link}
              href={`mailto:${user.email}`}
            >
              {user.email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {ICONS.phone(18)}

            <Typography
              variant="body2"
              color="text.primary"
              sx={{ textDecoration: 'none' }}
              component={Link}
              href={`tel:${user.phoneNumber}`}
            >
              {user.phoneNumber}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

WarehouseOwnerCard.propTypes = WarehouseOwnerCardProps;

export default WarehouseOwnerCard;
