'use client';

import { Pagination, Stack, alpha } from '@mui/material';
import Container from '@mui/material/Container';
// local components
import PropTypes from 'prop-types';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { paths } from 'src/routes/paths';
import RenderWarehouses from 'src/sections/private/dashboard/warehouses/common/render-warehouses';

/**
 * @param {HotDealsView.propTypes} props
 * @returns {JSX.Element}
 */
const HotDealsView = (props) => {
  const { warehouses } = props;
  const appearance = useAppearance();

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(warehouses);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading="HotRacks"
          links={[
            { name: 'Home', href: paths.root },
            { name: 'Warehouses', href: paths.warehouses.root },
            { name: 'HotRacks' },
          ]}
        />

        <RenderWarehouses
          isSuccess
          data={currentData}
          totalPages={totalPages}
          cardProps={{
            contentSx: { bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2) },
          }}
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

HotDealsView.propTypes = {
  warehouses: PropTypes.arrayOf(PropTypes.object),
};

export default HotDealsView;
