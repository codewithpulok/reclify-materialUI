import { Box, Card, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'src/components/common/image';
import { fNumber } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import { ICONS } from '../config-warehouse';

const WarehouseUserCardProps = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  totalWarehouses: PropTypes.number.isRequired,
};

/**
 * @param {WarehouseUserCardProps} props
 * @returns {JSX.Element}
 */
const WarehouseUserCard = (props) => {
  const { user, totalWarehouses } = props;
  return (
    <Card sx={{ px: { xs: 1, sm: 1.5 }, py: { xs: 1, sm: 1.2 }, borderRadius: 1 }}>
      <Stack direction="row" spacing={1.5} mb={2} alignItems="center">
        <Box sx={{ width: '60px', height: '60px' }}>
          <Image
            src={user.photoURL}
            alt={user.displayName}
            ratio="1/1"
            sx={{ borderRadius: 100 }}
          />
        </Box>
        <Stack sx={{ flex: 1, width: '100%' }}>
          <Typography variant="body1">{user.displayName}</Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {fDate(user.createdAt)}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ bgcolor: 'background.neutral', px: 0.5, py: 0.25, borderRadius: 0.5 }}
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          {ICONS.warehouse(16, { color: 'primary.main' })}
          <Typography variant="body2">
            {fNumber(totalWarehouses)} {totalWarehouses > 1 ? 'warehouses' : 'warehouse'}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

WarehouseUserCard.propTypes = WarehouseUserCardProps;

export default WarehouseUserCard;
