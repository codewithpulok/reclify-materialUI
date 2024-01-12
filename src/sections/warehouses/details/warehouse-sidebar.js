import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { WarehouseOwnerCard } from 'src/components/warehouse/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import WarehouseAddressMap from './warehouse-address-map';
import WarehouseBooking from './warehouse-booking';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {User} */
  seller: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseDetailsSidebar = (props) => {
  const { warehouse, seller, sx = {} } = props;
  const { user } = useAppSelector(selectAuth);
  return (
    <Stack sx={sx} spacing={2}>
      {/* if this is seller own warehouse then don't show */}
      {user && seller?.id !== user?.id ? (
        <WarehouseOwnerCard user={seller} clickable={user?.userType === 'admin'} />
      ) : null}
      <WarehouseBooking warehouse={warehouse} showPurchase={user?.userType === 'customer'} />
      <WarehouseAddressMap warehouse={warehouse} />
    </Stack>
  );
};

WarehouseDetailsSidebar.propTypes = Props;

export default WarehouseDetailsSidebar;
