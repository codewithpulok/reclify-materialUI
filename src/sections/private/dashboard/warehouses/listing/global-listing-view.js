'use client';

import { Pagination, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
// local components
import { getRegionScope } from 'src/assets/data';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import usePagination from 'src/hooks/use-pagination';
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
const GlobalListingView = (props) => {
  const scope = getRegionScope('global');

  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);

  // api state
  const listResponse = useWarehouseListQuery({ regionScope: 'global' });

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(
    listResponse?.data?.results?.filter((w) => w?.regionScope === 'global') || []
  );

  // refetch data on user id change
  useEffect(() => {
    if (user?.id) {
      listResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`${scope.name} Warehouses`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Warehouses', href: paths.dashboard.warehouses.root },
            { name: scope.name },
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

GlobalListingView.propTypes = Props;

export default GlobalListingView;
