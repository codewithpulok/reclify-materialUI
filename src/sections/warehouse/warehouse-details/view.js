'use client';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import { useSettingsContext } from 'src/components/settings';
import WarehouseBookingOptions from './warehouse-booking-options';
import WarehouseDescription from './warehouse-description';
import WarehouseHeader from './warehouse-header';
import WarehouseImageCarousel from './warehouse-image-carousel';
import WarehouseReviews from './warehouse-reviews';

const WarehouseDetailsProps = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {Review[]} */
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * Warehouse Details page component
 * @param {WarehouseDetailsProps} props
 * @returns {JSX.Element}
 */
function WarehouseDetails(props) {
  const { warehouse, reviews } = props;
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <WarehouseHeader isFeatured isVerified location={warehouse.location} name={warehouse.name} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <WarehouseImageCarousel list={warehouse.photos} />

          {/* show sidebar content in mobile mode & hide in tab mode */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }} mt={5}>
            <WarehouseBookingOptions
              space={warehouse.totalSpace}
              pricePerSquare={warehouse.pricePerSquare}
            />
          </Box>

          <WarehouseDescription description={warehouse.description} sx={{ mt: 5 }} />

          <WarehouseReviews reviews={reviews} sx={{ mt: 3 }} />
        </Grid>
        <Grid item xs={12} md={5}>
          {/* show sidebar content in tab mode & hide in mobile mode */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <WarehouseBookingOptions
              space={warehouse.totalSpace}
              pricePerSquare={warehouse.pricePerSquare}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

WarehouseDetails.propTypes = WarehouseDetailsProps;

export default WarehouseDetails;
