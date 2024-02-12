'use client';

import { Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { getServiceType } from 'src/constant/service-types';
import usePagination from 'src/hooks/use-pagination';
import { useListServicesQuery } from 'src/redux-toolkit/services/serviceApi';
import { paths } from 'src/routes/paths';
import RenderServices from 'src/sections/private/dashboard/services/common/render-services';

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

  const servicesResponse = useListServicesQuery();

  // services based on service type
  const filteredData = useMemo(
    () =>
      servicesResponse?.data?.results
        ? servicesResponse.data.results.filter((d) => d.type === serviceType)
        : [],
    [servicesResponse, serviceType]
  );

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(filteredData);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${service.label} Services`}
          links={[
            { name: 'Home', href: paths.root },
            { name: 'services', href: paths.services.root },
            { name: service.value },
          ]}
        />

        <RenderServices
          isError={servicesResponse.isError}
          isFetching={servicesResponse.isFetching}
          isLoading={servicesResponse.isLoading}
          isSuccess={servicesResponse.isSuccess}
          data={currentData}
          totalPages={totalPages}
        />

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

RegionView.propTypes = Props;

export default RegionView;
