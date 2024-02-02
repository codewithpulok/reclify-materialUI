'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
// local components
import { getSellers } from 'src/assets/dummy/users';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { SellerCard } from 'src/components/users/cards';

const SellersListingView = () => {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sellers"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid container spacing={1}>
        {getSellers().map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <SellerCard user={user} totalWarehouses={10} />
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="center" mt={8} mb={1}>
        <Pagination count={10} color="primary" size="small" />
      </Stack>
    </Container>
  );
};

export default SellersListingView;
