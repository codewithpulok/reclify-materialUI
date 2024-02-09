'use client';

import { Grid, Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseCard, WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { useWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const HotDealsView = (props) => {
  const settings = useSettingsContext();

  const listResponse = useWarehouseListQuery();

  // render warehouses
  const renderWarehouses = useCallback(
    (
      warehouses = [],
      notFoundText = 'No warehouses found',
      errorText = 'Something went to wrong'
    ) => {
      // error state
      if (listResponse.isError) {
        return <ErrorState text={listResponse?.error?.data?.message || errorText} />;
      }

      // empty state
      if (listResponse.isSuccess && warehouses.length === 0) {
        return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
      }

      // success state
      if (listResponse.isSuccess && warehouses.length) {
        return warehouses.map((warehouse) => (
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
    [listResponse]
  );

  // hot deals
  const hotdeals = useMemo(
    () =>
      listResponse?.data?.results instanceof Array
        ? listResponse?.data?.results.filter((w) => w.discountRate > 0 && w?.visible)
        : [],
    [listResponse]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading="Hot Racks"
          links={[
            { name: 'Home', href: paths.root },
            { name: 'Warehouses', href: paths.warehouses.root },
            { name: 'Hot Racks' },
          ]}
        />

        <Grid container spacing={2}>
          {renderWarehouses(hotdeals, 'No hot deals available')}
        </Grid>

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      </Stack>
    </Container>
  );
};

HotDealsView.propTypes = Props;

export default HotDealsView;
