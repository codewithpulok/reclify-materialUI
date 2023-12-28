import { Box, Chip, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'src/components/common/image';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { ICONS } from '../../config-settings';

const TransactionWarehouseProps = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
};
/**
 * @param {TransactionWarehouseProps} props
 * @returns {JSX.Element}
 */
const TransactionWarehouse = (props) => {
  const { warehouse } = props;
  return (
    <Stack
      spacing={1.5}
      sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 1, minHeight: '100%' }}
    >
      <Box sx={{ width: '100%' }}>
        <Image
          src={warehouse.photos[0].coverUrl}
          alt={warehouse.photos[0].title}
          ratio="16/9"
          sx={{ borderRadius: 1 }}
        />
      </Box>
      <Stack>
        <Typography variant="h6">{warehouse.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {getWarehouseAddress(warehouse.address)}
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
    </Stack>
  );
};

TransactionWarehouse.propTypes = TransactionWarehouseProps;

export default TransactionWarehouse;
