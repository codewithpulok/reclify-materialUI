'use client';

import { Container, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import usePagination from 'src/hooks/use-pagination';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useListSellersQuery } from 'src/redux-toolkit/services/adminApi';
import { paths } from 'src/routes/paths';
import RenderUsers from '../../common/render-users';

const SellersListingView = () => {
  // app state
  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);

  // api state
  const listResponse = useListSellersQuery();

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
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sellers"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'sellers' }]}
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

export default SellersListingView;
