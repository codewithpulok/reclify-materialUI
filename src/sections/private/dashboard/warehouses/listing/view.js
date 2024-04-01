'use client';

import { Grid, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import { regionScopes } from 'src/assets/data';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { WarehouseCarousel, WarehouseFeaturedCarousel } from 'src/components/warehouse/carousel';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { Header, subtitles } from 'src/sections/public/dashboard/warehouses/listing/view';
import { ICONS } from '../config-warehouse';

// ----------------------------------------------------------------------

export default function ListingView() {
  const appearance = useAppearance();

  const warehousesResponse = useWarehouseListQuery();

  // render warehouses
  const renderWarehouses = useCallback(
    (warehouses = [], notFoundText = 'No warehouses found', featuredProps = {}, itemProps = {}) => {
      // error state
      if (warehousesResponse.isError) {
        return <ErrorState text={warehousesResponse?.error?.data?.message} />;
      }

      // empty state
      if (warehousesResponse.isSuccess && warehouses.length === 0) {
        return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
      }

      // success state
      if (warehousesResponse.isSuccess && warehouses.length) {
        return (
          <Grid item xs={12}>
            <Stack spacing={5}>
              <WarehouseFeaturedCarousel data={warehouses} {...featuredProps} />
              <WarehouseCarousel data={warehouses} {...itemProps} />
            </Stack>
          </Grid>
        );
      }

      // loading state
      return Array.from(Array(3).keys()).map((i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <WarehouseCardSkeleton />
        </Grid>
      ));
    },
    [warehousesResponse]
  );

  // hot deals
  const hotdeals = useMemo(
    () =>
      Array.isArray(warehousesResponse?.data?.results)
        ? warehousesResponse?.data?.results.filter((w) => w.hotRackEnabled)
        : [],
    [warehousesResponse]
  );
  // data based on scope
  const scopeData = useMemo(
    () =>
      regionScopes.reduce((prev, next) => {
        prev[next.code] = Array.isArray(warehousesResponse?.data?.results)
          ? warehousesResponse.data?.results.filter((w) => w?.regionScope === next.code)
          : [];
        return prev;
      }, {}),
    [warehousesResponse]
  );

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <Header
          title="HotRacks"
          subtitle="Save thousands on storage from top warehousing providers with exclusive deals."
          href={paths.warehouses.hot_deals}
          icon={ICONS.hot_deals(38, { color: 'secondary.main' })}
        />

        <Grid container spacing={2}>
          {renderWarehouses(hotdeals, 'No hot deals available')}
        </Grid>
      </Stack>

      {regionScopes.map((scope) => (
        <Stack mb={5} spacing={5} key={scope.code}>
          <Header
            title={`In ${scope.name}`}
            subtitle={subtitles[scope.code]}
            href={paths.warehouses.regionScope(scope.code)}
            icon={getIconify(scope.icon, 28)}
          />

          <Grid container spacing={2}>
            {renderWarehouses(scopeData[scope.code])}
          </Grid>
        </Stack>
      ))}
    </Container>
  );
}
