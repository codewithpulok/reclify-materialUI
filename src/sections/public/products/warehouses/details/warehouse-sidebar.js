import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { UserDetailsCard } from 'src/components/users/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import WarehouseDocumentList from 'src/sections/private/dashboard/warehouses/details/warehouse-document-list';
import WarehouseAddressMap from './warehouse-address-map';
import WarehouseBooking from './warehouse-booking';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {User} */
  seller: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
  children: PropTypes.node,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseDetailsSidebar = (props) => {
  const { warehouse, seller, sx = {}, children } = props;
  const { user } = useAppSelector(selectAuth);
  return (
    <Stack sx={sx} spacing={2}>
      {/* if this is seller own warehouse then don't show */}
      {user && seller?.id !== user?.id ? (
        <UserDetailsCard user={seller} userType="seller" showLogo />
      ) : null}
      <WarehouseBooking
        warehouse={warehouse}
        showPurchase={user?.userType === 'customer' && warehouse?.regionScope !== 'global'}
      />
      <WarehouseAddressMap warehouse={warehouse} />

      <WarehouseDocumentList documents={warehouse?.documents || []} />

      {children}
    </Stack>
  );
};

WarehouseDetailsSidebar.propTypes = Props;

export default WarehouseDetailsSidebar;
