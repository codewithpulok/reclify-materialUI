'use client';

import { Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
// local components
import PropTypes from 'prop-types';
import { getRegionScope } from 'src/assets/data';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import RenderWarehouses from 'src/sections/private/dashboard/warehouses/common/render-warehouses';

/**
 * @param {GlobalListingView.propTypes} props
 * @returns {JSX.Element}
 */
const GlobalListingView = (props) => {
  const { warehouses } = props;

  const scope = getRegionScope('global');
  const appearance = useAppearance();

  // api state
  const listResponse = useWarehouseListQuery({ regionScope: 'global' });

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(
    warehouses?.filter((w) => w?.regionScope === 'global') || []
  );

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${scope.name} Warehouses`}
          links={[{ name: 'Warehouses', href: paths.warehouses.root }, { name: scope.name }]}
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

GlobalListingView.propTypes = {
  warehouses: PropTypes.arrayOf(PropTypes.object),
};

export default GlobalListingView;
