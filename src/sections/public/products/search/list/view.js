'use client';

import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const appearance = useAppearance();

  // searchparam states
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const type = searchParam.get('type');
  const region = searchParam.get('region');
  const service = searchParam.get('service');
  const subtypes = searchParam.get('subtypes');

  // check valid type filter or not
  const hasTypeFilter = useMemo(() => type === 'warehouse' || type === 'service', [type]);

  // parse page heading based on search params
  const pageHeading = useMemo(() => {
    if (typeof query === 'string' && !!query.trim()) return `You've searched for - ${query}`;

    if (hasTypeFilter) return 'Showing Filtered Data';

    return undefined;
  }, [hasTypeFilter, query]);

  // api state
  const [searchAll, searchResponse] = useLazySearchAllQuery();
  const isLoading = useMemo(
    () => searchResponse.isLoading || searchResponse.isFetching,
    [searchResponse.isLoading, searchResponse.isFetching]
  );

  // make request on search
  useEffect(() => {
    if (!query && !type) {
      router.push(paths.dashboard.root); // there is nothing related to search then redirect
    } else {
      searchAll({ query, type, region, service, subtypes });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, region, service, subtypes, type]);

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
            {data.slice(0, 3).map((serviceData) => (
              <Grid item key={serviceData.id} xs={12} sm={6} md={4}>
                <ServiceCard key={serviceData.id} service={serviceData} />
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
          heading={pageHeading}
          links={[{ name: 'Home', href: paths.root }, { name: 'Search' }]}
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
                {!!searchResponse.data?.results?.users && (
                  <Button
                    variant="contained"
                    color="primary"
                    LinkComponent={RouterLink}
                    href={paths.search.users(query)}
                  >
                    Show More
                  </Button>
                )}
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Typography variant="h4">Warehouses</Typography>

              {renderWarehouses(searchResponse.data?.results?.warehouses || [], true)}

              <Stack direction="row" justifyContent="end">
                {!!searchResponse.data?.results?.warehouses && (
                  <Button
                    variant="contained"
                    color="primary"
                    LinkComponent={RouterLink}
                    href={paths.search.warehouses(query)}
                  >
                    Show More
                  </Button>
                )}
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Typography variant="h4">Services</Typography>

              {renderServices(searchResponse.data?.results?.services || [], true)}

              <Stack direction="row" justifyContent="end">
                {!!searchResponse.data?.results?.services && (
                  <Button
                    variant="contained"
                    color="primary"
                    LinkComponent={RouterLink}
                    href={paths.search.services(query)}
                  >
                    Show More
                  </Button>
                )}
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
