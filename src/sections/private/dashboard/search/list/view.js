'use client';

import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { ServiceCard } from 'src/components/service/cards';
import { CustomerCard, SellerCard } from 'src/components/users/cards';
import { WarehouseCard } from 'src/components/warehouse/cards';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useLazySearchAllQuery } from 'src/redux-toolkit/services/searchApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchListView = (props) => {
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const type = searchParam.get('type');
  // const region = searchParam.get('region');
  // const serviceType = searchParam.get('serviceType');
  const appearance = useAppearance();

  const hasTypeFilter = useMemo(() => type === 'warehouse' || type === 'service', [type]);

  // api state
  const [searchAll, searchResponse] = useLazySearchAllQuery();
  const isLoading = useMemo(
    () => searchResponse.isLoading || searchResponse.isFetching,
    [searchResponse.isLoading, searchResponse.isFetching]
  );

  // make request on search
  useEffect(() => {
    searchAll(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // render users
  const renderUsers = useCallback(
    (data = [], showLess) => {
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      if (!isLoading && searchResponse.data?.success && !data.length) {
        return <EmptyState />;
      }

      if (!isLoading && searchResponse.data?.success && data) {
        return (
          <Grid container spacing={1}>
            {data.slice(0, showLess ? 4 : undefined).map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                {user.userType === 'seller' && (
                  <SellerCard user={user} serviceCount={user?.serviceCount} />
                )}
                {user.userType === 'customer' && (
                  <CustomerCard user={user} totalTransactions={user?.transactionCount} />
                )}
              </Grid>
            ))}
          </Grid>
        );
      }

      return <LoadingState />;
    },
    [isLoading, searchResponse.data?.success, searchResponse.isError]
  );

  // render warehouses
  const renderWarehouses = useCallback(
    (data = [], showLess) => {
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      if (!isLoading && searchResponse.data?.success && !data.length) {
        return <EmptyState />;
      }

      if (!isLoading && searchResponse.data?.success && data) {
        return (
          <Grid container spacing={1.5}>
            {data.slice(0, showLess ? 3 : undefined).map((warehouse) => (
              <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
                <WarehouseCard key={warehouse.id} warehouse={warehouse} />
              </Grid>
            ))}
          </Grid>
        );
      }

      return <LoadingState />;
    },
    [isLoading, searchResponse.data?.success, searchResponse.isError]
  );

  // render services
  const renderServices = useCallback(
    (data = [], showLess) => {
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      if (!isLoading && searchResponse.data?.success && !data.length) {
        return <EmptyState />;
      }

      if (!isLoading && searchResponse.data?.success && data) {
        return (
          <Grid container spacing={1.5}>
            {data.slice(0, showLess ? 3 : undefined).map((service) => (
              <Grid item key={service.id} xs={12} sm={6} md={4}>
                <ServiceCard key={service.id} service={service} />
              </Grid>
            ))}
          </Grid>
        );
      }

      return <LoadingState />;
    },
    [isLoading, searchResponse.data?.success, searchResponse.isError]
  );

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Search' }]}
        />

        {hasTypeFilter ? (
          <>
            {type === 'warehouse' && (
              <Stack spacing={3}>
                <Typography variant="h4">Warehouses</Typography>

                {renderWarehouses(searchResponse.data?.results?.warehouses || [])}
              </Stack>
            )}

            {type === 'service' && (
              <Stack spacing={3}>
                <Typography variant="h4">Services</Typography>

                {renderServices(searchResponse.data?.results?.services || [])}
              </Stack>
            )}
          </>
        ) : (
          <>
            <Stack spacing={3}>
              <Typography variant="h4">Users</Typography>

              {renderUsers(searchResponse.data?.results?.users || [], true)}

              <Stack direction="row" justifyContent="end">
                <Button
                  variant="contained"
                  color="primary"
                  LinkComponent={RouterLink}
                  href={paths.dashboard.search.users(query)}
                >
                  Show More
                </Button>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Typography variant="h4">Warehouses</Typography>

              {renderWarehouses(searchResponse.data?.results?.warehouses || [], true)}

              <Stack direction="row" justifyContent="end">
                <Button
                  variant="contained"
                  color="primary"
                  LinkComponent={RouterLink}
                  href={paths.dashboard.search.warehouses(query)}
                >
                  Show More
                </Button>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Typography variant="h4">Services</Typography>

              {renderServices(searchResponse.data?.results?.services || [], true)}

              <Stack direction="row" justifyContent="end">
                <Button
                  variant="contained"
                  color="primary"
                  LinkComponent={RouterLink}
                  href={paths.dashboard.search.services(query)}
                >
                  Show More
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </Container>
  );
};

SearchListView.propTypes = Props;

export default SearchListView;
