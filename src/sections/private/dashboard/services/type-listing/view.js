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
import { useListServicesQuery } from 'src/redux-toolkit/services/serviceApi';
import { paths } from 'src/routes/paths';
import RenderServices from '../common/render-services';

const Props = {
  serviceType: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RegionView = (props) => {
  const { serviceType } = props;

  const appearance = useAppearance();
  const service = getServiceType(serviceType);

  // api state
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
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${service.label} Services`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'services', href: paths.dashboard.services.root },
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
