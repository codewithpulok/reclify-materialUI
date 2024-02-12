'use client';

import { Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import usePagination from 'src/hooks/use-pagination';
import { useWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import RenderWarehouses from 'src/sections/private/dashboard/warehouses/common/render-warehouses';

const Props = {
  /** @type {RegionType} */
  region: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RegionView = (props) => {
  const { region } = props;
  const settings = useSettingsContext();

  // api state
  const listResponse = useWarehouseListQuery({ region: region.code });

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(listResponse?.data?.results);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${region.name} Warehouses`}
          links={[
            { name: 'Home', href: paths.root },
            { name: 'Warehouses', href: paths.warehouses.root },
            { name: region.name },
          ]}
        />

        <RenderWarehouses
          isError={listResponse.isError}
          isFetching={listResponse.isFetching}
          isLoading={listResponse.isLoading}
          isSuccess={listResponse.isSuccess}
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
