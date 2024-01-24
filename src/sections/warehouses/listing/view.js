'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useEffect, useMemo } from 'react';
// local components
import { regions } from 'src/assets/data';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { getIconify } from 'src/components/common/iconify/utilities';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLazyWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';
import WarehouseCarousel from './warehouse-carousel';

// ----------------------------------------------------------------------

export default function ListingView() {
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
        return (
          <Grid item xs={12}>
            <WarehouseCarousel data={warehouses} />
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
    [results]
  );

  // hot deals
  const hotdeals = useMemo(
    () =>
      results?.data?.results instanceof Array
        ? results?.data?.results.filter((w) => w.discountRate > 0 && w?.visible)
        : [],
    [results]
  );
  // warehouse based on region
  const regionWarehouses = useMemo(
    () =>
      regions.reduce((prev, next) => {
        prev[next.code] =
          results?.data?.results instanceof Array
            ? results.data?.results.filter((w) => w.region === next.code && w.visible)
            : [];
        return prev;
      }, {}),
    [results]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {ICONS.hot_deals(28, { color: 'secondary.main' })}
          <Typography variant="h4">Hot Deals</Typography>

          <Button
            LinkComponent={RouterLink}
            href={paths.dashboard.warehouses.hot_deals}
            variant="soft"
            color="primary"
            sx={{ ml: 'auto' }}
          >
            View more
          </Button>
        </Stack>

        <Grid container spacing={2}>
          {renderWarehouses(hotdeals, 'No hot deals available')}
        </Grid>
      </Stack>

      {regions.map((region) => (
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
              href={paths.dashboard.warehouses[region.code]}
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
    </Container>
  );
}
