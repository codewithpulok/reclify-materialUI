import { Box, Button, Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
// local components
import Image from 'src/components/common/image';
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseOwnerCard = (props) => {
  const { user, sx } = props;
  return (
    <Card sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 1, ...sx }}>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: 'start',
        }}
        direction="row"
        alignItems="center"
        spacing={1.5}
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

            <Label color="primary" size="small" variant="soft">
              owner
            </Label>
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
          <Stack direction="row" alignItems="center" spacing={0.5} mt={2} justifyContent="end">
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.messages.root}/${user.id}`}
              color="primary"
              variant="outlined"
              startIcon={ICONS.send_message()}
              size="small"
            >
              Send a message
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

WarehouseOwnerCard.propTypes = Props;

export default WarehouseOwnerCard;
