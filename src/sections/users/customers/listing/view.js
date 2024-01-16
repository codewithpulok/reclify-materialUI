'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
// local components
import { getCustomers } from 'src/assets/dummy/users';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { CustomerCard } from 'src/components/users/cards';

const CustomerListingView = () => {
  const settings = useSettingsContext();
  const customers = getCustomers();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Customers"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid container spacing={1}>
        {customers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <CustomerCard user={user} totalTransactions={1000} />
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="center" mt={8} mb={1}>
        <Pagination count={10} color="primary" size="small" />
      </Stack>
    </Container>
  );
};

export default CustomerListingView;
