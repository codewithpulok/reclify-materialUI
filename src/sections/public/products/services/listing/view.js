'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { ServiceCardSkeleton } from 'src/components/service/cards';
import { getAvailableServiceTypes, serviceTypes } from 'src/constant/service-types';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useListServicesQuery } from 'src/redux-toolkit/services/serviceApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-services';
import ServiceCarousel from './service-carousel';

// ----------------------------------------------------------------------

export default function ListingView() {
  const appearance = useAppearance();

  const servicesResponse = useListServicesQuery();

  // render services
  const renderServices = useCallback(
    (services = [], notFoundText = 'No Services found', errorText = 'Something went to wrong') => {
      // error state
      if (servicesResponse.isError) {
        return <ErrorState text={servicesResponse?.error?.data?.message || errorText} />;
      }

      // empty state
      if (servicesResponse.isSuccess && services.length === 0) {
        return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
      }

      // success state
      if (servicesResponse.isSuccess && services.length) {
        return (
          <Grid item xs={12}>
            <ServiceCarousel data={services} />
          </Grid>
        );
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

  // services based on types
  const typesServices = useMemo(
    () =>
      serviceTypes.reduce((prev, next) => {
        prev[next.value] =
          servicesResponse?.data?.results instanceof Array
            ? servicesResponse?.data?.results.filter((s) => s.type === next.value)
            : [];
        return prev;
      }, {}),
    [servicesResponse]
  );

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      {getAvailableServiceTypes().map((service) => (
        <Stack mb={5} spacing={5} key={service.value}>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant="h4">{service.label}</Typography>

            <Button
              LinkComponent={RouterLink}
              href={paths.services.type(service.value)}
              variant="soft"
              color="primary"
              sx={{ ml: 'auto' }}
            >
              View more
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {renderServices(typesServices[service.value])}
          </Grid>
        </Stack>
      ))}
    </Container>
  );
}
