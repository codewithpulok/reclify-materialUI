import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { UserDetailsCard } from 'src/components/users/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import DetailsAdditional from './details-additional';
import WarehouseBooking from './details-booking';
import WarehouseDocumentList from './details-document-list';
import DetailsMap from './details-map';

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
const DetailsSidebar = (props) => {
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
      {!!warehouse?.additionalAddresses?.length && (
        <DetailsAdditional data={warehouse?.additionalAddresses} />
      )}
      <DetailsMap warehouse={warehouse} />
      <WarehouseDocumentList documents={warehouse?.documents || []} />

      {children}
    </Stack>
  );
};

DetailsSidebar.propTypes = Props;

export default DetailsSidebar;
