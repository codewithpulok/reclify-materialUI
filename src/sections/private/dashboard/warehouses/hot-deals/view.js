'use client';

import { Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useWarehouseListQuery } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import RenderWarehouses from '../common/render-warehouses';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const HotDealsView = (props) => {
  const appearance = useAppearance();
  const { user } = useAppSelector(selectAuth);

  // api state
  const listResponse = useWarehouseListQuery({ hasDiscount: true });

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(listResponse?.data?.results);

  // refetch data on user id change
  useEffect(() => {
    if (user?.id) {
      listResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading="Hot Racks"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Warehouses', href: paths.dashboard.warehouses.root },
            { name: 'Hot Racks' },
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

HotDealsView.propTypes = Props;

export default HotDealsView;
