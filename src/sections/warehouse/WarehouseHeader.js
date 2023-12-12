import { Box, Chip, Typography } from '@mui/material';
import { ICONS } from './config-warehouse';

const WarehouseHeader = ({ name, location, isVerified, isFeatured }) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" mr={3}>
          {location}
        </Typography>
        {isVerified && <Chip label="Verified" icon={ICONS.verified} color="success" size="small" />}
        {isFeatured && <Chip label="Featured" icon={ICONS.featured} color="warning" size="small" />}
      </Box>
    </Box>
  );
};

export default WarehouseHeader;
