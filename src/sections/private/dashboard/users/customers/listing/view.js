'use client';

import { Container, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useListCustomersQuery } from 'src/redux-toolkit/services/adminApi';
import { paths } from 'src/routes/paths';
import RenderUsers from '../../common/render-users';

const CustomerListingView = () => {
  const appearance = useAppearance();
  const { user } = useAppSelector(selectAuth);

  // api state
  const listResponse = useListCustomersQuery();

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(
    listResponse?.data?.results,
    12
  );

  // update list response
  useEffect(() => {
    if (user?.id) {
      listResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Merchants"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Merchants' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <RenderUsers
        isError={listResponse.isError}
        isFetching={listResponse.isFetching}
        isLoading={listResponse.isLoading}
        isSuccess={listResponse.isSuccess}
        data={currentData}
        totalPages={totalPages}
      />

      <Stack direction="row" justifyContent="center" mt={8}>
        <Pagination
          count={totalPages}
          color="primary"
          size="small"
          page={currentPage}
          onChange={(_e, page) => goTo(page)}
        />
      </Stack>
    </Container>
  );
};

export default CustomerListingView;
