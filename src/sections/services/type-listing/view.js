'use client';

import { Grid, Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
// local components
import { getServicesByType } from 'src/assets/dummy/services';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { ServiceCard, ServiceCardSkeleton } from 'src/components/service/cards';
import { getServiceType } from 'src/constant/service-types';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-services';

const Props = {
  serviceType: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RegionView = (props) => {
  const { serviceType } = props;

  const settings = useSettingsContext();
  const service = getServiceType(serviceType);

  const results = useMemo(
    () => ({
      data: { results: getServicesByType(serviceType) },
      isSuccess: true,
    }),
    [serviceType]
  );

  // render services
  const renderServices = useCallback(
    (services = [], notFoundText = 'No Services found', errorText = 'Something went to wrong') => {
      // error state
      if (results.isError) {
        return <ErrorState text={results?.error?.data?.message || errorText} />;
      }

      // empty state
      if (results.isSuccess && services.length === 0) {
        return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
      }

      // success state
      if (results.isSuccess && services.length) {
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
    [results]
  );

  // services based on service type
  const filteredData = useMemo(
    () =>
      results?.data?.results ? results.data.results.filter((d) => d.type === serviceType) : [],
    [results, serviceType]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${service.label} Services`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'services', href: paths.dashboard.services.root },
            { name: service.value },
          ]}
        />

        <Grid container spacing={2}>
          {renderServices(filteredData, 'Nothing here')}
        </Grid>

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      </Stack>
    </Container>
  );
};

RegionView.propTypes = Props;

export default RegionView;
