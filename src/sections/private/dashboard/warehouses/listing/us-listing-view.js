'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import { usRegions } from 'src/assets/data';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { WarehouseCarousel, WarehouseFeaturedCarousel } from 'src/components/warehouse/carousel';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

// ----------------------------------------------------------------------

export default function USListingView() {
  const appearance = useAppearance();

  const warehousesResponse = useWarehouseListQuery();

  // render warehouses
  const renderWarehouses = useCallback(
    (
      warehouses = [],
      notFoundText = 'No warehouses found',
      errorText = 'Something went to wrong',
      featuredProps = {}
    ) => {
      // error state
      if (warehousesResponse.isError) {
        return <ErrorState text={warehousesResponse?.error?.data?.message || errorText} />;
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
              <WarehouseCarousel data={warehouses} />
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

  // warehouse based on region
  const regionWarehouses = useMemo(
    () =>
      usRegions.reduce((prev, next) => {
        prev[next.code] =
          warehousesResponse?.data?.results instanceof Array
            ? warehousesResponse.data?.results.filter((w) => w.region === next.code && w.visible)
            : [];
        return prev;
      }, {}),
    [warehousesResponse]
  );

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading="United States Warehouses"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Warehouses', href: paths.dashboard.warehouses.root },
            { name: 'us' },
          ]}
        />

        {usRegions.map((region) => (
          <Stack mb={5} spacing={5} key={region.code}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {getIconify(region.icon, 28, {
                color: 'secondary.main',
                rotate: `${region.rotate ? 90 * region.rotate : 0}deg`,
              })}
              <Typography variant="h4">In {region.name}</Typography>

              <Button
                LinkComponent={RouterLink}
                href={paths.dashboard.warehouses.region(region.code)}
                variant="soft"
                color="primary"
                sx={{ ml: 'auto' }}
              >
                View more
              </Button>
            </Stack>

            <Grid container spacing={2}>
              {renderWarehouses(regionWarehouses[region.code])}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
