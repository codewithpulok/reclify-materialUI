'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import PropTypes from 'prop-types';
import { usRegions } from 'src/assets/data';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { EmptyState } from 'src/components/common/custom-state';
import { NextImage } from 'src/components/common/next-image';
import { WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { WarehouseCarousel, WarehouseFeaturedCarousel } from 'src/components/warehouse/carousel';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

// ----------------------------------------------------------------------

export const icons = {
  northeast: '/assets/icons/region/northeast.svg',
  midwest: '/assets/icons/region/midwest.svg',
  West: '/assets/icons/region/west.svg',
  south: '/assets/icons/region/south.svg',
  'alaska-hawai': '/assets/icons/region/alaska-hawaii.svg',
};

// ----------------------------------------------------------------------

/**
 * @param {USListingView.propTypes} props
 * @returns {JSX.Element}
 */
const USListingView = (props) => {
  const { warehouses } = props;
  const appearance = useAppearance();

  // warehouse based on region
  const regionWarehouses = useMemo(
    () =>
      usRegions.reduce((prev, next) => {
        prev[next.code] =
          warehouses instanceof Array ? warehouses.filter((w) => w.region === next.code) : [];
        return prev;
      }, {}),
    [warehouses]
  );

  // render warehouses
  const renderWarehouses = useCallback(
    (data = [], notFoundText = 'No warehouses found', featuredProps = {}) => {
      // empty state
      if (data.length === 0) {
        return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
      }

      // success state
      if (data.length) {
        return (
          <Grid item xs={12}>
            <Stack spacing={5}>
              <WarehouseFeaturedCarousel data={data} {...featuredProps} />
              <WarehouseCarousel data={data} />
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
    []
  );

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading="United States Warehouses"
          links={[{ name: 'Warehouses', href: paths.warehouses.root }, { name: 'us' }]}
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
              <NextImage src={icons[region.code]} width={50} height={40} />

              <Typography variant="h4">In {region.name}</Typography>

              <Button
                LinkComponent={RouterLink}
                href={paths.warehouses.region(region.code)}
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
};

USListingView.propTypes = {
  /** @type {Warehouse[]} */
  warehouses: PropTypes.arrayOf(PropTypes.object),
};

export default USListingView;
