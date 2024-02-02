import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { useResponsive } from 'src/hooks/use-responsive';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import ImageCarousel from './image-carousel';
import WarehouseApprovedUses from './warehouse-approved-uses';
import WarehouseDescription from './warehouse-description';
import WarehouseFacilities from './warehouse-facilities';
import WarehouseFeatures from './warehouse-features';
import WarehouseReviews from './warehouse-reviews';
import WarehouseRules from './warehouse-rules';
import WarehouseServices from './warehouse-services';
import WarehouseDetailsSidebar from './warehouse-sidebar';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {Review[]} */
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** @type {User} */
  seller: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehosueDetailsMain = (props) => {
  const { warehouse, reviews, seller } = props;
  const { user } = useAppSelector(selectAuth);

  const mdDown = useResponsive('down', 'md');

  return (
    <Stack spacing={2}>
      <ImageCarousel list={warehouse.photos} />

      {/* show sidebar content in mobile mode & hide in tab mode */}
      <WarehouseDetailsSidebar
        seller={seller}
        warehouse={warehouse}
        sx={{ display: { md: 'none' } }}
      />

      <WarehouseDescription description={warehouse.description} />

      <WarehouseFeatures features={warehouse.features} />
      <WarehouseApprovedUses approvedUses={warehouse.approvedUses} />

      <WarehouseFacilities facilityDetails={warehouse.facilityDetails} />
      <WarehouseServices services={warehouse.services} />
      <WarehouseRules rules={warehouse.rules} />

      {mdDown && (
        <WarehouseReviews
          reviews={reviews}
          canAddNewReview={user && user.userType === 'customer'}
          warehouseId={warehouse.id}
        />
      )}
    </Stack>
  );
};

WarehosueDetailsMain.propTypes = Props;

export default WarehosueDetailsMain;
