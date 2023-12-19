'use client';

import { Button, Grid, Link, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useState } from 'react';
// local components
import { warehouses } from 'src/assets/dummy/warehouses';
import { useAuthContext } from 'src/auth/hooks';
import { ConfirmationAlert } from 'src/components/common/alert';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { WarehouseCard } from 'src/components/warehouse/cards';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function ListingView() {
  const { user } = useAuthContext();
  const settings = useSettingsContext();
  const [confirmation, setConfirmation] = useState({ open: false, title: '', text: '' });

  const handleDelete = (warehouse) => {
    setConfirmation({
      open: true,
      title: `Are you sure to delete ${warehouse.name} warehouse`,
      text: 'After deleting warehouse, it cannot be undone.',
    });
  };

  const onDeleteDisagree = () => {
    setConfirmation((prev) => ({ ...prev, open: false }));
  };

  const onDeleteAgree = () => {
    setConfirmation((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
        <CustomBreadcrumbs
          heading="Warehouse Listing"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Listing' }]}
        />

        {/* Warehouse create button only for warehouse user */}
        {user?.role === 'warehouse' ? (
          <Link href="/warehouse/create">
            <Button color="primary" variant="soft">
              Create Warehouse
            </Button>
          </Link>
        ) : null}
      </Stack>

      <Grid container spacing={2}>
        {warehouses.map((warehouse) => (
          <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              onDelete={() => handleDelete(warehouse)}
              hasControl={user?.role === 'warehouse'}
            />
          </Grid>
        ))}
      </Grid>

      <ConfirmationAlert
        open={confirmation.open}
        onAgree={onDeleteAgree}
        onDisagree={onDeleteDisagree}
        onClose={onDeleteDisagree}
        title={confirmation?.title}
        text={confirmation?.text}
      />
    </Container>
  );
}
