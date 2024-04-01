'use client';

import { Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { getServiceType } from 'src/constant/service-types';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { paths } from 'src/routes/paths';
import RenderServices from 'src/sections/private/dashboard/services/common/render-services';

/**
 * @param {RegionView.propTypes} props
 * @returns {JSX.Element}
 */
const RegionView = (props) => {
  const { serviceType, services } = props;

  const appearance = useAppearance();
  const service = getServiceType(serviceType);

  // services based on service type
  const filteredData = useMemo(
    () => (Array.isArray(services) ? services.filter((d) => d.type === serviceType) : []),
    [services, serviceType]
  );

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(filteredData);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${service.label} Services`}
          links={[
            { name: 'Home', href: paths.root },
            { name: 'services', href: paths.services.root },
            { name: service.value },
          ]}
        />

        <RenderServices isSuccess data={currentData} totalPages={totalPages} />

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination
            count={totalPages}
            color="primary"
            size="small"
            page={currentPage}
            onChange={(_e, page) => goTo(page)}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

RegionView.propTypes = {
  serviceType: PropTypes.string.isRequired,
  /** @type {Service[]} */
  services: PropTypes.arrayOf(PropTypes.object),
};

export default RegionView;
