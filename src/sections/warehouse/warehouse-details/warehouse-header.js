import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { ICONS } from '../config-warehouse';

const WarehouseHeaderProps = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool.isRequired,
};

const WarehouseHeader = ({ name, location, isVerified, isFeatured }) => {
  const router = useRouter();

  return (
    <Box sx={{ mb: 8 }}>
      <Stack flexDirection="row" alignItems="start" justifyContent="space-between">
        <Typography variant="h2" sx={{ mb: 1 }}>
          {name}
        </Typography>
        <IconButton title="go back" onClick={() => router.back()}>
          {ICONS.back(28)}
        </IconButton>
      </Stack>
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
        columnGap={0.8}
        rowGap={1}
      >
        <Typography variant="body2" mr={3}>
          {location}
        </Typography>
        <Stack flexDirection="row" spacing={0.5}>
          {isVerified && (
            <Chip label="Verified" icon={ICONS.verified()} color="success" size="small" />
          )}
          {isFeatured && (
            <Chip label="Featured" icon={ICONS.featured()} color="warning" size="small" />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

WarehouseHeader.propTypes = WarehouseHeaderProps;

export default WarehouseHeader;
