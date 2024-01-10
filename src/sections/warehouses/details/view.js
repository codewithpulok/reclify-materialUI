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
import WarehouseAddressMap from './warehouse-address-map';
import WarehouseApprovedUses from './warehouse-approved-uses';
import WarehouseBooking from './warehouse-booking';
import WarehouseDescription from './warehouse-description';
import WarehouseFeatures from './warehouse-features';
import WarehouseHeader from './warehouse-header';
import WarehouseImageCarousel from './warehouse-image-carousel';
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
  const owner = getUserByID('1' || warehouse.sellerId); // TODO: replace this with actual user

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
          <WarehouseImageCarousel list={warehouse.photos} />

          {/* show sidebar content in mobile mode & hide in tab mode */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }} mt={5}>
            {user && user?.id !== owner.id ? (
              <WarehouseOwnerCard sx={{ mb: 3 }} user={owner} />
            ) : null}

            <WarehouseBooking warehouse={warehouse} showPurchase={user?.userType === 'customer'} />
          </Box>

          <WarehouseDescription description={warehouse.description} sx={{ mt: 5 }} />

          <WarehouseFeatures features={warehouse.features} sx={{ mt: 3 }} />
          <WarehouseApprovedUses approvedUses={warehouse.approvedUses} sx={{ mt: 3 }} />
          <WarehouseTabs
            facilityDetails={warehouse.facilityDetails}
            rules={warehouse.rules}
            services={warehouse.services}
            sx={{ mt: 3 }}
          />

          <WarehouseAddressMap sx={{ mt: 3 }} warehouse={warehouse} />

          <WarehouseReviews
            reviews={reviews}
            sx={{ mt: 3 }}
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
