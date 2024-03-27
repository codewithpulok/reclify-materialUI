'use client';

import { Button, Grid, Stack, Typography, alpha } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import PropTypes from 'prop-types';
import { regionScopes } from 'src/assets/data';
import { EmptyState } from 'src/components/common/custom-state';
import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { WarehouseCarousel, WarehouseFeaturedCarousel } from 'src/components/warehouse/carousel';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

// ----------------------------------------------------------------------

/**
 * @param {ListingView.propTypes} props
 * @returns {JSX.Element}
 */
const ListingView = (props) => {
  const { data } = props;
  const appearance = useAppearance();

  // render warehouses
  const renderWarehouses = useCallback(
    (warehouses = [], notFoundText = 'No warehouses found', featuredProps = {}) => {
      // empty state
      if (warehouses.length === 0) {
        return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
      }

      // success state
      if (warehouses.length) {
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
    []
  );

  // hot deals
  const hotdeals = useMemo(
    () => (Array.isArray(data) ? data.filter((w) => w.hotRackEnabled) : []),
    [data]
  );

  // data based on scope
  const scopeData = useMemo(
    () =>
      regionScopes.reduce((prev, next) => {
        prev[next.code] = Array.isArray(data)
          ? data.filter((w) => w?.regionScope === next.code)
          : [];
        return prev;
      }, {}),
    [data]
  );

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {ICONS.hot_deals(28, { color: 'secondary.main' })}
          <Typography variant="h4">HotRacks</Typography>

          <Button
            LinkComponent={RouterLink}
            href={paths.warehouses.hot_deals}
            variant="soft"
            color="primary"
            sx={{ ml: 'auto' }}
          >
            View more
          </Button>
        </Stack>

        <Grid container spacing={2}>
          {renderWarehouses(hotdeals, 'No hot deals available', {
            itemProps: {
              contentSx: { bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.4) },
            },
          })}
        </Grid>
      </Stack>

      {regionScopes.map((scope) => (
        <Stack mb={5} spacing={5} key={scope.code}>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {getIconify(scope.icon, 28)}
            <Typography variant="h4">In {scope.name}</Typography>

            <Button
              LinkComponent={RouterLink}
              href={paths.warehouses.regionScope(scope.code)}
              variant="soft"
              color="primary"
              sx={{ ml: 'auto' }}
            >
              View more
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {renderWarehouses(scopeData[scope.code])}
          </Grid>
        </Stack>
      ))}
    </Container>
  );
};

ListingView.propTypes = {
  /** @type {Warehouse[]} */
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ListingView;
