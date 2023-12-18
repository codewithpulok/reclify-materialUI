import { Box, Chip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ICONS } from '../config-warehouse';

const WarehouseHeaderProps = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool.isRequired,
};

const WarehouseHeader = ({ name, location, isVerified, isFeatured }) => (
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

WarehouseHeader.propTypes = WarehouseHeaderProps;

export default WarehouseHeader;
