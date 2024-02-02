'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { ServiceCard, ServiceCardSkeleton } from 'src/components/service/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLazyListServicesQuery } from 'src/redux-toolkit/services/serviceApi';
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
  const { user } = useAppSelector(selectAuth);

  const [getServices, servicesResponse] = useLazyListServicesQuery();

  useEffect(() => {
    if (user !== null && user) {
      getServices();
    }
  }, [getServices, user]);

  // render services
  const renderServices = useCallback(
    (services = [], notFoundText = 'No Services found', errorText = 'Something went to wrong') => {
      // error state
      if (servicesResponse.isError) {
        return <ErrorState text={servicesResponse?.error?.data?.message || errorText} />;
      }

      // empty state
      if (servicesResponse.isSuccess && services.length === 0) {
        return <EmptyState text={notFoundText} />;
      }

      // success state
      if (servicesResponse.isSuccess && services.length) {
        return services.map((serviceData) => (
          <Grid item key={serviceData.id} xs={12} sm={6} md={4}>
            <ServiceCard key={serviceData.id} service={serviceData} />
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
    [servicesResponse]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[
            { name: 'Home', href: paths.root },
            { name: 'Search', href: paths.search.results(query) },
            { name: 'Services' },
          ]}
        />

        <Grid container spacing={2}>
          {renderServices(servicesResponse.data?.results || [], 'No Services available')}
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
