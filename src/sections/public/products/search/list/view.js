'use client';

import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { ServiceCard } from 'src/components/service/cards';
import { CustomerCard, SellerCard } from 'src/components/users/cards';
import { WarehouseCard } from 'src/components/warehouse/cards';
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
  const settings = useSettingsContext();

  // api state
  const [searchAll, searchResponse] = useLazySearchAllQuery();
  const isLoading = useMemo(
    () => searchResponse.isLoading || searchResponse.isFetching,
    [searchResponse.isLoading, searchResponse.isFetching]
  );

  // make request on search
  useEffect(() => {
    if (query) searchAll(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // render users
  const renderUsers = useCallback(
    (data = []) => {
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      if (!isLoading && searchResponse.data?.success && !data.length) {
        return <EmptyState />;
      }

      if (!isLoading && searchResponse.data?.success && data) {
        return (
          <Grid container spacing={1}>
            {data.slice(0, 4).map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                {user.userType === 'seller' && <SellerCard user={user} totalWarehouses={10} />}
                {user.userType === 'customer' && (
                  <CustomerCard user={user} totalTransactions={100} />
                )}
                {user.userType === 'admin' && <CustomerCard user={user} totalTransactions={1000} />}
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
    (data = []) => {
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      if (!isLoading && searchResponse.data?.success && !data.length) {
        return <EmptyState />;
      }

      if (!isLoading && searchResponse.data?.success && data) {
        return (
          <Grid container spacing={1.5}>
            {data.slice(0, 3).map((warehouse) => (
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
    (data = []) => {
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      if (!isLoading && searchResponse.data?.success && !data.length) {
        return <EmptyState />;
      }

      if (!isLoading && searchResponse.data?.success && data) {
        return (
          <Grid container spacing={1.5}>
            {data.slice(0, 3).map((service) => (
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
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[{ name: 'Home', href: paths.root }, { name: 'Search' }]}
        />
        <Stack spacing={3}>
          <Typography variant="h4">Users</Typography>

          {renderUsers(searchResponse.data?.results?.users || [])}

          <Stack direction="row" justifyContent="end">
            <Button
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
              href={paths.search.users(query)}
            >
              Show More
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <Typography variant="h4">Warehouses</Typography>

          {renderWarehouses(searchResponse.data?.results?.warehouses || [])}

          <Stack direction="row" justifyContent="end">
            <Button
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
              href={paths.search.warehouses(query)}
            >
              Show More
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <Typography variant="h4">Services</Typography>

          {renderServices(searchResponse.data?.results?.services || [])}

          <Stack direction="row" justifyContent="end">
            <Button
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
              href={paths.search.services(query)}
            >
              Show More
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

SearchListView.propTypes = Props;

export default SearchListView;
