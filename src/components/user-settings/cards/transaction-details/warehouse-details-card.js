import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Card } from '@mui/material';
import Image from 'src/components/common/image';
import { PLACEHOLDER_WAREHOUSE_IMAGE } from 'src/config-global';
import { joinAddressObj } from 'src/utils/address';
import { ICONS } from '../../config-user-settings';

const WarehouseDetailsCardProps = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * @param {WarehouseDetailsCardProps} props
 * @returns {JSX.Element}
 */
const WarehouseDetailsCard = (props) => {
  const { warehouse, sx = {} } = props;

  const warehouseImage = warehouse?.photos?.[0]?.link || PLACEHOLDER_WAREHOUSE_IMAGE;

  return (
    <Card component={Stack} spacing={1.5} sx={{ p: 1.5, borderRadius: 1, ...sx }}>
      <Box sx={{ width: '100%' }}>
        <Image src={warehouseImage} alt={warehouse?.title} ratio="16/9" sx={{ borderRadius: 1 }} />
      </Box>
      <Stack>
        <Typography variant="h6">{warehouse.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {joinAddressObj(warehouse.address) || 'address not available'}
        </Typography>
        <Stack flexDirection="row" alignItems="center" spacing={0.5} flexWrap="wrap" sx={{ mb: 3 }}>
          {warehouse.isVerified && (
            <Chip icon={ICONS.verified()} label="Verified" size="small" color="primary" />
          )}
          {warehouse.isFeatured && (
            <Chip icon={ICONS.featured()} label="Featured" size="small" color="warning" />
          )}
        </Stack>
        <Typography variant="body1">{warehouse.description}</Typography>
      </Stack>
    </Card>
  );
};

WarehouseDetailsCard.propTypes = WarehouseDetailsCardProps;

export default WarehouseDetailsCard;
