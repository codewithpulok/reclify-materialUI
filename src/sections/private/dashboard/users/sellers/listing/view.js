'use client';

import { Container, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { SellerUnverifyDialog, SellerVerifyDialog } from 'src/components/common/custom-dialog';
import { useDialog } from 'src/hooks/use-dialog';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useListSellersQuery } from 'src/redux-toolkit/services/adminApi';
import { paths } from 'src/routes/paths';
import RenderUsers from '../../common/render-users';

const SellersListingView = () => {
  // app state
  const appearance = useAppearance();
  const { user } = useAppSelector(selectAuth);
  const verifyDialog = useDialog();
  const unverifyDialog = useDialog();

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
    <>
      <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Sellers"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Sellers' }]}
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
          sellerProps={{ onVerify: verifyDialog.onOpen, onUnverify: unverifyDialog.onOpen }}
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

      <SellerVerifyDialog
        open={verifyDialog.open}
        onClose={verifyDialog.onClose}
        data={verifyDialog.value}
      />

      <SellerUnverifyDialog
        open={unverifyDialog.open}
        onClose={unverifyDialog.onClose}
        data={unverifyDialog.value}
      />
    </>
  );
};

export default SellersListingView;
