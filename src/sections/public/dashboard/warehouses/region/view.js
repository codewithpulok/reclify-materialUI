'use client';

import { Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { paths } from 'src/routes/paths';
import RenderWarehouses from 'src/sections/private/dashboard/warehouses/common/render-warehouses';

/**
 * @param {RegionView.propTypes} props
 * @returns {JSX.Element}
 */
const RegionView = (props) => {
  const { region, warehouses } = props;
  const appearance = useAppearance();

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(warehouses);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${region.name} Warehouses`}
          links={[
            { name: 'Home', href: paths.root },
            { name: 'Warehouses', href: paths.warehouses.root },
            { name: region.name },
          ]}
        />

        <RenderWarehouses isSuccess data={currentData} totalPages={totalPages} />

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
  /** @type {RegionType} */
  region: PropTypes.object.isRequired,
  /** @type {Warehouse[]} */
  warehouses: PropTypes.arrayOf(PropTypes.object),
};

export default RegionView;
