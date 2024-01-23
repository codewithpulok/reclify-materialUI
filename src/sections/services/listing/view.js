'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import { getServices } from 'src/assets/dummy/services';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { ServiceCardSkeleton } from 'src/components/service/cards';
import { serviceTypes } from 'src/constant/service-types';
import { RouterLink } from 'src/routes/components';
import { ICONS } from '../config-services';
import ServiceCarousel from './service-carousel';

// ----------------------------------------------------------------------

export default function ListingView() {
  const settings = useSettingsContext();

  const results = useMemo(
    () => ({
      data: { results: getServices() },
      isSuccess: true,
    }),
    []
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
    [results]
  );

  // services based on types
  const typesServices = useMemo(
    () =>
      serviceTypes.reduce((prev, next) => {
        prev[next.value] =
          results?.data?.results instanceof Array
            ? results?.data?.results.filter((s) => s.type === next.value)
            : [];
        return prev;
      }, {}),
    [results]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {serviceTypes.slice(1).map((service) => (
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
              href="#"
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
