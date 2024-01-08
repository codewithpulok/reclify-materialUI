'use client';

import { Button, Grid, Link, Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
// local components
import { enqueueSnackbar } from 'notistack';
import { ConfirmationAlert } from 'src/components/common/alert';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseCard, WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import {
  useLazyWarehouseListQuery,
  useWarehouseDeleteMutation,
} from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

// ----------------------------------------------------------------------

export default function ListingView() {
  const searchParams = useSearchParams();
  const { user } = useAppSelector(selectAuth);

  const [getWarehouses, results] = useLazyWarehouseListQuery();
  const [deleteWarehouse, deleteResult] = useWarehouseDeleteMutation();

  const settings = useSettingsContext();
  const [deleteDialog, setDeleteDialog] = useState({ open: false, warehouse: null });

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
  const openDeleteDialog = (warehouse) => {
    setDeleteDialog({
      open: true,
      warehouse,
    });
  };
  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, warehouse: null });
  };
  const handleDelete = useCallback(
    async (id) => {
      const response = await deleteWarehouse(id);
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(data?.message || 'Error in deleting warehouse', { variant: 'error' });
        console.error('Warehouse delete error: ', response);
      } else {
        enqueueSnackbar('Warehouse deleted successfully');
        closeDeleteDialog();
      }
    },
    [deleteWarehouse]
  );

  // handle warehouse filter
  useEffect(() => {
    if (results.isSuccess && results?.data?.results instanceof Array) {
      let filtered = [...results.data.results];

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
      }

      if (user?.role === 'seller') {
        filtered = [...filtered].filter((w) => w.sellerId === user.id);
      }

      setFilteredWarehouses(filtered);
    }
  }, [filterRegions, filterUsers, results, searchQuery, user]);

  useEffect(() => {
    if (user !== null && user) {
      getWarehouses();
    }
  }, [getWarehouses, user]);

  // render warehouses
  const renderWarehouses = useCallback(() => {
    // error state
    if (results.isError) {
      return <ErrorState text="Something went to wrong" />;
    }

    // empty state
    if (results.isSuccess && filteredWarehouses.length === 0) {
      return <EmptyState text="No warehouses found" icon={ICONS.warehouse()} />;
    }

    // success state
    if (results.isSuccess && filteredWarehouses.length) {
      return filteredWarehouses.map((warehouse) => (
        <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
            onDelete={() => openDeleteDialog(warehouse)}
            hasControl={user?.role === 'seller'}
          />
        </Grid>
      ));
    }

    // loading state
    return Array.from(Array(6).keys()).map((i) => (
      <Grid key={i} item xs={12} sm={6} md={4}>
        <WarehouseCardSkeleton />
      </Grid>
    ));
  }, [results, filteredWarehouses, user]);

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
        <CustomBreadcrumbs
          heading={heading}
          links={[{ name: 'Dashboard', href: '#' }, { name: 'Warehouses' }]}
        />

        {/* Warehouse create button only for sellers */}
        {user?.role === 'seller' ? (
          <Link href={paths.dashboard.warehouses.create} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button color="primary" variant="soft" fullWidth>
              Create Warehouse
            </Button>
          </Link>
        ) : null}
      </Stack>

      <Grid container spacing={2}>
        {renderWarehouses()}
      </Grid>

      {results.isSuccess && !!filteredWarehouses.length && (
        <Stack direction="row" justifyContent="center" mt={8} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      )}

      <ConfirmationAlert
        open={deleteDialog.open}
        onAgree={() => handleDelete(deleteDialog.warehouse?.id)}
        onDisagree={closeDeleteDialog}
        onClose={closeDeleteDialog}
        title="Are you sure to delete this warehouse?"
        text="After deleting warehouse, it cannot be undone."
        isLoading={deleteResult.isLoading}
      />
    </Container>
  );
}
