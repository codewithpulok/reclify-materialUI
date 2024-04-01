'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback, useMemo } from 'react';
// local components
import PropTypes from 'prop-types';
import { EmptyState } from 'src/components/common/custom-state';
import { ServiceCardSkeleton } from 'src/components/service/cards';
import { getAvailableServiceTypes, serviceTypes } from 'src/constant/service-types';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-services';
import ServiceCarousel from './service-carousel';

// ----------------------------------------------------------------------

/**
 *
 * @param {ListingView.propTypes} props
 * @returns {JSX.Element}
 */
const ListingView = (props) => {
  const { services } = props;
  const appearance = useAppearance();

  // render services
  const renderServices = useCallback((data = [], notFoundText = 'No Services found') => {
    // empty state
    if (data.length === 0) {
      return <EmptyState text={notFoundText} icon={ICONS.warehouse()} />;
    }

    // success state
    if (data.length) {
      return (
        <Grid item xs={12}>
          <ServiceCarousel data={data} />
        </Grid>
      );
    }

    // loading state
    return Array.from(Array(3).keys()).map((i) => (
      <Grid key={i} item xs={12} sm={6} md={4}>
        <ServiceCardSkeleton />
      </Grid>
    ));
  }, []);

  // services based on types
  const typesServices = useMemo(
    () =>
      serviceTypes.reduce((prev, next) => {
        prev[next.value] = Array.isArray(services)
          ? services.filter((s) => s.type === next.value)
          : [];
        return prev;
      }, {}),
    [services]
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
};

ListingView.propTypes = {
  /** @type {Service} */
  services: PropTypes.arrayOf(PropTypes.object),
};

export default ListingView;
