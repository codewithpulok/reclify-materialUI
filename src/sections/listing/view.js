'use client';

import { Button, Grid, Link, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
// local components
import { warehouses } from 'src/assets/dummy/warehouses';
import { useAuthContext } from 'src/auth/hooks';
import { ConfirmationAlert } from 'src/components/common/alert';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseCard } from 'src/components/warehouse/cards';
import { getWarehouseAddress } from 'src/components/warehouse/utils';

// ----------------------------------------------------------------------

export default function ListingView() {
  const searchParams = useSearchParams();

  const { user } = useAuthContext();
  const settings = useSettingsContext();
  const [confirmation, setConfirmation] = useState({ open: false, title: '', text: '' });

  const [filteredWarehouses, setFilteredWarehouses] = useState([]);

  const searchQuery = searchParams.get('query');
  const filterUsers = user?.role === 'admin' ? searchParams.get('users') : null;
  const filterRegions = searchParams.get('regions');

  // generate page heading
  const heading = useMemo(
    () => (searchQuery ? `Search results for "${searchQuery}"` : 'Warehouse Listing'),
    [searchQuery]
  );

  // handle delete warehouse
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

  // handle warehouse filter
  useEffect(() => {
    let filtered = [...warehouses];

    if (searchQuery) {
      // handle some search api call
      filtered = [...filtered].filter((w) =>
        getWarehouseAddress(w.address).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterUsers) {
      // do something
    }

    if (filterRegions) {
      // do something
      // filtered = [...filtered].filter((w) =>
      //   getWarehouseAddress(w.address).includes(searchQuery)
      // );
    }

    console.log({ filtered, warehouses });

    setFilteredWarehouses(filtered);
  }, [filterRegions, filterUsers, searchQuery]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={5}
        flexWrap="wrap"
        spacing={2}
      >
        <CustomBreadcrumbs heading={heading} links={[{ name: 'Listing' }]} />

        {/* Warehouse create button only for warehouse user */}
        {user?.role === 'warehouse' ? (
          <Link href="/warehouse/create" sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button color="primary" variant="soft" fullWidth>
              Create Warehouse
            </Button>
          </Link>
        ) : null}
      </Stack>

      <Grid container spacing={2}>
        {filteredWarehouses.map((warehouse) => (
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
