'use client';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import { useSettingsContext } from 'src/components/settings';
import WarehouseBookingOptions from './WarehouseBookingOptions';
import WarehouseDescription from './WarehouseDescription';
import WarehouseHeader from './WarehouseHeader';
import WarehouseImageCarousel from './imageCarousel';

const WarehouseDetailsProps = {
  warehouse: PropTypes.object.isRequired,
};

function WarehouseDetails({ warehouse }) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <WarehouseHeader isFeatured isVerified location={warehouse.location} name={warehouse.name} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <WarehouseImageCarousel list={warehouse.photos} />

          <Box sx={{ display: { xs: 'none', md: 'block' } }} mt={5}>
            <WarehouseDescription description={warehouse.description} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <WarehouseBookingOptions
            space={warehouse.totalSpace}
            pricePerSquare={warehouse.pricePerSquare}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: 'block', md: 'none' } }} mt={5}>
        <WarehouseDescription description={warehouse.description} />
      </Box>
    </Container>
  );
}

WarehouseDetails.propTypes = WarehouseDetailsProps;

export default WarehouseDetails;
