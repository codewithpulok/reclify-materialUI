'use client';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useSettingsContext } from 'src/components/settings';
import WarehouseBookingOptions from './WarehouseBookingOptions';
import WarehouseDescription from './WarehouseDescription';
import WarehouseHeader from './WarehouseHeader';
import WarehouseImageCarousel from './imageCarousel';

function Warehouse({ warehouse }) {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <WarehouseHeader
        isFeatured={true}
        isVerified={true}
        location={warehouse.location}
        name={warehouse.name}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <WarehouseImageCarousel list={warehouse.photos} />

          <Box sx={{ display: { xs: 'none', md: 'block' } }} mt={5}>
            <WarehouseDescription />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <WarehouseBookingOptions space={10000} price={0.75} />
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: 'block', md: 'none' } }} mt={5}>
        <WarehouseDescription />
      </Box>
    </Container>
  );
}

export default Warehouse;
