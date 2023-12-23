'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
import { getWarehouseUsers } from 'src/assets/dummy/users';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseUserCard } from 'src/components/warehouse/cards';

const WarehouseUsersView = () => {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Warehouse Users"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid container spacing={1}>
        {getWarehouseUsers().map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <WarehouseUserCard user={user} totalWarehouses={10} />
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="start" mt={8} mb={1}>
        <Pagination count={10} color="primary" size="small" />
      </Stack>
    </Container>
  );
};

export default WarehouseUsersView;
