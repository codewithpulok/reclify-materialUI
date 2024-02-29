'use client';

import { Box, Button, Pagination, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
// local components
import { WarehouseDeleteDialog } from 'src/components/common/custom-dialog';
import { useDialog } from 'src/hooks/use-dialog';
import usePagination from 'src/hooks/use-pagination';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useWarehouseOwnListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import RenderWarehouses from '../../dashboard/warehouses/common/render-warehouses';

// ----------------------------------------------------------------------

export default function Warehouses() {
  const { user } = useAppSelector(selectAuth);

  // data state
  const listResponse = useWarehouseOwnListQuery();
  const listData = useMemo(() => {
    if (Array.isArray(listResponse?.data?.results)) return [...listResponse.data.results].reverse();
    return undefined;
  }, [listResponse?.data?.results]);

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(listData);

  // dialog state
  const deleteDialog = useDialog();

  // update warehouses on user id
  useEffect(() => {
    if (user?.id) {
      listResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

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

      <RenderWarehouses
        isError={listResponse.isError}
        isFetching={listResponse.isFetching}
        isLoading={listResponse.isLoading}
        isSuccess={listResponse.isSuccess}
        data={currentData}
        totalPages={totalPages}
        cardProps={{ hasControl: true, onDelete: deleteDialog.onOpen }}
      />

      <Stack direction="row" justifyContent="center" mt={3} mb={1}>
        <Pagination
          count={totalPages}
          color="primary"
          size="small"
          page={currentPage}
          onChange={(_e, page) => goTo(page)}
        />
      </Stack>

      <WarehouseDeleteDialog
        onClose={deleteDialog.onClose}
        open={deleteDialog.open}
        warehouse={deleteDialog.value}
      />
    </Box>
  );
}
