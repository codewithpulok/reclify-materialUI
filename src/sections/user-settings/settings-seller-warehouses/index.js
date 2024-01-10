'use client';

import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
// local components
import { ConfirmationAlert } from 'src/components/common/alert';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { WarehouseCard, WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import {
  useLazyWarehouseListQuery,
  useWarehouseDeleteMutation,
} from 'src/redux-toolkit/services/warehouseApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

export default function Warehouses() {
  const { user } = useAppSelector(selectAuth);

  const [getWarehouses, results] = useLazyWarehouseListQuery();

  const [deleteWarehouse, deleteResult] = useWarehouseDeleteMutation();

  const [deleteDialog, setDeleteDialog] = useState({ open: false, warehouse: null });

  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

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
    console.log({ results });

    if (results.isLoading || results.isFetching) {
      setIsFiltered(false);
    } else if (results.isSuccess && results?.data?.results instanceof Array) {
      const filtered = [...results.data.results];

      setFilteredWarehouses(filtered);
      setIsFiltered(true);
    }
  }, [results, user]);

  useEffect(() => {
    if (user !== null && user) {
      getWarehouses();
    }
  }, [getWarehouses, user]);

  // render warehouses
  const renderWarehouses = useCallback(() => {
    // error state
    if (!results.isLoading && results.isError) {
      return <ErrorState text="Something went to wrong" />;
    }

    // empty state
    if (results.isSuccess && isFiltered && filteredWarehouses.length === 0) {
      return <EmptyState text="No warehouses found" icon={ICONS.warehouse()} />;
    }

    // success state
    if (results.isSuccess && isFiltered && filteredWarehouses.length) {
      return filteredWarehouses.map((warehouse) => (
        <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
            onDelete={() => openDeleteDialog(warehouse)}
            hasControl={user?.userType === 'seller'}
          />
        </Grid>
      ));
    }

    // loading state
    return Array.from(Array(3).keys()).map((i) => (
      <Grid key={i} item xs={12} sm={6} md={4}>
        <WarehouseCardSkeleton />
      </Grid>
    ));
  }, [results, filteredWarehouses, user, isFiltered]);

  return (
    <Box>
      <Stack direction="row" justifyContent="end" mb={5}>
        <Button
          LinkComponent={RouterLink}
          href={paths.dashboard.warehouses.create}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          color="primary"
          variant="soft"
          fullWidth
        >
          Create Warehouse
        </Button>
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
    </Box>
  );
}
