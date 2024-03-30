'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
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

export const subtitles = {
  us: 'Browse warehousing providers from across the country by region.',
  global: 'Explore warehouses from around the world.',
};

// ----------------------------------------------------------------------

/** @type {(props: Header.propTypes) => JSX.Element} */
export const Header = (props) => {
  const { href, icon, subtitle, title } = props;
  return (
    <Stack direction="row" alignItems="start">
      <Stack direction="row" alignItems="center" gap={0.5}>
        {icon}
        <Stack>
          <Typography variant="h4">{title}</Typography>
          <Typography color="text.secondary" variant="body2">
            {subtitle}
          </Typography>
        </Stack>
      </Stack>

      <Button
        LinkComponent={RouterLink}
        href={href}
        variant="soft"
        color="primary"
        sx={{ ml: 'auto' }}
      >
        View more
      </Button>
    </Stack>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.any,
};

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
    (warehouses = [], notFoundText = 'No warehouses found', featuredProps = {}, itemProps = {}) => {
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
};

ListingView.propTypes = {
  /** @type {Warehouse[]} */
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ListingView;
