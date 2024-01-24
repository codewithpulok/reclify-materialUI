'use client';

import { Grid, Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useEffect, useMemo } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseCard, WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLazyWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { ICONS } from '../../config-warehouse';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseNotVerifiedView = (props) => {
  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);

  const [getWarehouses, results] = useLazyWarehouseListQuery();

  useEffect(() => {
    if (user !== null && user) {
      getWarehouses();
    }
  }, [getWarehouses, user]);

  // render warehouses
  const renderWarehouses = useCallback(
    (
      warehouses = [],
      notFoundText = 'No warehouses found',
      errorText = 'Something went to wrong'
    ) => {
      // error state
      if (results.isError) {
        return <ErrorState text={results?.error?.data?.message || errorText} />;
      }

      // empty state
      if (results.isSuccess && warehouses.length === 0) {
        return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
      }

      // success state
      if (results.isSuccess && warehouses.length) {
        return warehouses
          .filter((w) => !w.isVerified)
          .map((warehouse) => (
            <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
              <WarehouseCard key={warehouse.id} warehouse={warehouse} />
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
    [results]
  );

  // filtered data
  const filteredData = useMemo(
    () =>
      results?.data?.results instanceof Array
        ? results?.data?.results.filter((w) => !w.isVerified && w?.visible)
        : [],
    [results]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading="Not Verified Warehouses"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Warehouses', href: paths.dashboard.warehouses.root },
            { name: 'Not Verified' },
          ]}
        />

        <Grid container spacing={2}>
          {renderWarehouses(filteredData, 'No not verified warehouse available')}
        </Grid>

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      </Stack>
    </Container>
  );
};

WarehouseNotVerifiedView.propTypes = Props;

export default WarehouseNotVerifiedView;
