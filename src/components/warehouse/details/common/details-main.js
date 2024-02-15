import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { useResponsive } from 'src/hooks/use-responsive';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import DetailsAmenities from './details-amenities';
import WarehouseDescription from './details-description';
import WarehouseFacilities from './details-facilities';
import WarehouseFeatures from './details-features';
import WarehouseReviews from './details-reviews';
import ImageCarousel from './image-carousel';
import WarehouseHighlights from './details-highlights';
import WarehouseServices from './details-services';
import WarehouseDetailsSidebar from './details-sidebar';

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

      <WarehouseDescription description={warehouse?.description} />
      <WarehouseHighlights highlights={warehouse?.highlights} />

      <WarehouseFeatures features={warehouse.features} />
      <DetailsAmenities amenities={warehouse.amenities} />

      <WarehouseFacilities facilityDetails={warehouse.facilityDetails} />
      <WarehouseServices services={warehouse.services} />

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
