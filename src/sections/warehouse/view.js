'use client';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useSettingsContext } from 'src/components/settings';

import WarehouseImageCarousel from './imageCarousel';

const ASSETS_API = 'https://api-dev-minimal-v510.vercel.app';

const warehouseImages = [
  {
    id: '1',
    title: 'Warehouse Outside',
    // coverUrl: `/assets/images/home/zone_landing.webp`,
    coverUrl: `${ASSETS_API}/assets/images/cover/cover_${1}.jpg`,
  },
  {
    id: '2',
    title: 'Warehouse Inside',
    coverUrl: `${ASSETS_API}/assets/images/cover/cover_${2}.jpg`,
  },
];

function Warehouse() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h2" sx={{ mb: 5 }}>
        Warehouse Title
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <WarehouseImageCarousel list={warehouseImages} />
        </Grid>
        {/* <Grid container spacing={3}>
          <h1>Warehopuse</h1>
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default Warehouse;
