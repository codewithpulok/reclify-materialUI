'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { ServiceCard, ServiceCardSkeleton } from 'src/components/service/cards';
import { useLazySearchServicesQuery } from 'src/redux-toolkit/services/searchApi';
import { paths } from 'src/routes/paths';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchServicesView = (props) => {
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const settings = useSettingsContext();

  // api state
  const [searchServices, searchResponse] = useLazySearchServicesQuery();
  const isLoading = useMemo(
    () => searchResponse.isLoading || searchResponse.isFetching,
    [searchResponse.isLoading, searchResponse.isFetching]
  );

  // make request on search
  useEffect(() => {
    if (query) searchServices(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // render services
  const renderServices = useCallback(
    (data = []) => {
      // error state
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      // empty state
      if (!isLoading && searchResponse.isSuccess && data.length === 0) {
        return <EmptyState />;
      }

      // success state
      if (!isLoading && searchResponse.isSuccess && data.length) {
        return data.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            <ServiceCard key={service.id} service={service} />
          </Grid>
        ));
      }

      // loading state
      return Array.from(Array(3).keys()).map((i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <ServiceCardSkeleton />
        </Grid>
      ));
    },
    [isLoading, searchResponse.isError, searchResponse.isSuccess]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Search', href: paths.dashboard.search.results(query) },
            { name: 'Services' },
          ]}
        />

        <Grid container spacing={2}>
          {renderServices(searchResponse.data?.results || [])}
        </Grid>

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      </Stack>
    </Container>
  );
};

SearchServicesView.propTypes = Props;

export default SearchServicesView;
