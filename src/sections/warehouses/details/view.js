'use client';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
// local components
import { getUserByID } from 'src/assets/dummy/users';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseOwnerCard } from 'src/components/warehouse/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import ImageCarousel from './image-carousel';
import WarehouseAddressMap from './warehouse-address-map';
import WarehouseApprovedUses from './warehouse-approved-uses';
import WarehouseBooking from './warehouse-booking';
import WarehouseDescription from './warehouse-description';
import WarehouseFeatures from './warehouse-features';
import WarehouseHeader from './warehouse-header';
import WarehouseReviews from './warehouse-reviews';
import WarehouseTabs from './warehouse-tabs';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {Review[]} */
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * Warehouse Details page component
 * @param {Props} props
 * @returns {JSX.Element}
 */
function DetailsView(props) {
  const { warehouse, reviews } = props;
  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);
  const owner = getUserByID(warehouse?.sellerId) || getUserByID('1'); // TODO: replace this with actual user

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <WarehouseHeader
        isFeatured={warehouse.isFeatured}
        isVerified={warehouse.isVerified}
        address={warehouse.address}
        name={warehouse.name}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ImageCarousel list={warehouse.photos} sx={{ mb: 5 }} />

          {/* show sidebar content in mobile mode & hide in tab mode */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }} mb={5}>
            {user && user?.id !== owner.id ? (
              <WarehouseOwnerCard sx={{ mb: 3 }} user={owner} />
            ) : null}

            <WarehouseBooking warehouse={warehouse} showPurchase={user?.userType === 'customer'} />
          </Box>

          <WarehouseDescription description={warehouse.description} sx={{ mb: 5 }} />

          <WarehouseFeatures features={warehouse.features} sx={{ mb: 3 }} />
          <WarehouseApprovedUses approvedUses={warehouse.approvedUses} sx={{ mb: 3 }} />
          <WarehouseTabs
            facilityDetails={warehouse.facilityDetails}
            rules={warehouse.rules}
            services={warehouse.services}
            sx={{ mb: 3 }}
          />

          <WarehouseAddressMap sx={{ mb: 3 }} warehouse={warehouse} />

          <WarehouseReviews
            reviews={reviews}
            sx={{ mb: 3 }}
            canAddNewReview={user && user.userType === 'customer'}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          {/* show sidebar content in tab mode & hide in mobile mode */}
          <Box sx={{ display: { xs: 'none', md: 'block', width: '100%' } }}>
            {owner?.id !== user?.id ? <WarehouseOwnerCard sx={{ mb: 3 }} user={owner} /> : null}
            <WarehouseBooking warehouse={warehouse} showPurchase={user?.userType === 'customer'} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

DetailsView.propTypes = Props;

export default DetailsView;
