'use client';

import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
// local components
import { WarehouseDeleteDialog } from 'src/components/common/custom-dialog';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { WarehouseCard, WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLazyWarehouseOwnListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

export default function Warehouses() {
  const { user } = useAppSelector(selectAuth);

  // data state
  const [getWarehouses, warehouseResponse] = useLazyWarehouseOwnListQuery();

  // dialog state
  const deleteDialog = useDialog();

  // get warehouses
  useEffect(() => {
    if (user !== null && user) {
      getWarehouses();
    }
  }, [getWarehouses, user]);

  // render warehouses
  const renderWarehouses = useCallback(
    (data) => {
      // error state
      if (!warehouseResponse.isLoading && warehouseResponse.isError) {
        return <ErrorState text="Something went to wrong" />;
      }

      // empty state
      if (warehouseResponse.isSuccess && data.length === 0) {
        return <EmptyState text="No warehouses found" icon={ICONS.warehouse()} />;
      }

      // success state
      if (warehouseResponse.isSuccess && data.length) {
        return data.map((warehouse) => (
          <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              onDelete={() => deleteDialog.onOpen(warehouse)}
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
    },
    [warehouseResponse, user, deleteDialog]
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="end" mb={5}>
        <Button
          LinkComponent={RouterLink}
          href={paths.dashboard.warehouses.create}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          color="primary"
          variant="contained"
          fullWidth
        >
          Create Warehouse
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {renderWarehouses(warehouseResponse.data?.results || [])}
      </Grid>

      {warehouseResponse.isSuccess && warehouseResponse.data?.results?.length && (
        <Stack direction="row" justifyContent="center" mt={8} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      )}

      <WarehouseDeleteDialog
        onClose={deleteDialog.onClose}
        open={deleteDialog.open}
        warehouse={deleteDialog.value}
      />
    </Box>
  );
}
