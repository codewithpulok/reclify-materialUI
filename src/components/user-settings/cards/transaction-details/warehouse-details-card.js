import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Card } from '@mui/material';
import Image from 'src/components/common/image';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
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
  return (
    <Card component={Stack} spacing={1.5} sx={{ p: 1.5, borderRadius: 1, ...sx }}>
      <Box sx={{ width: '100%' }}>
        <Image
          src={warehouse.photos[0].link}
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
    </Card>
  );
};

WarehouseDetailsCard.propTypes = WarehouseDetailsCardProps;

export default WarehouseDetailsCard;
