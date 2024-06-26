import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { ReviewList } from 'src/components/review/lists';
import { useResponsive } from 'src/hooks/use-responsive';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import DetailsAmenities from './details-amenities';
import WarehouseDescription from './details-description';
import WarehouseFacilities from './details-facilities';
import WarehouseFeatures from './details-features';
import WarehouseHighlights from './details-highlights';
import WarehouseDetailsSidebar from './details-sidebar';
import ImageCarousel from './image-carousel';

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
const DetailsMain = (props) => {
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

      <WarehouseHighlights highlights={warehouse?.highlights} />
      <WarehouseDescription description={warehouse?.description} />

      <WarehouseFeatures features={warehouse.features} />
      <DetailsAmenities amenities={warehouse.amenities} />

      <WarehouseFacilities facilityDetails={warehouse.facilityDetails} />

      {mdDown && (
        <ReviewList
          reviews={reviews}
          canAddNewReview={user && user.userType === 'customer'}
          warehouseId={warehouse.id}
        />
      )}
    </Stack>
  );
};

DetailsMain.propTypes = Props;

export default DetailsMain;
