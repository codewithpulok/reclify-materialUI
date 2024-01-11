'use client';

import { Grid, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { WarehouseCard, WarehouseCardSkeleton } from 'src/components/warehouse/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLazyWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

const Props = {
  /** @type {RegionType} */
  region: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RegionView = (props) => {
  const { region } = props;

  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);

  const [getWarehouses, results] = useLazyWarehouseListQuery();
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);

  // handle warehouse filter
  useEffect(() => {
    if (results.isSuccess && results?.data?.results instanceof Array) {
      const filtered = [...results.data.results];

      setFilteredWarehouses(filtered);
    }
  }, [results]);

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
    [results]
  );

  // warehouse based on region
  const regionWarehouses = useMemo(
    () => filteredWarehouses.filter((w) => w.region === region.code),
    [filteredWarehouses, region]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${region.name} Warehouses`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Warehouses', href: paths.dashboard.warehouses.root },
            { name: region.name },
          ]}
        />

        <Grid container spacing={2}>
          {renderWarehouses(regionWarehouses, 'Nothing here')}
        </Grid>
      </Stack>
    </Container>
  );
};

RegionView.propTypes = Props;

export default RegionView;
