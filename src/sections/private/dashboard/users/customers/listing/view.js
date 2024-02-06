'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { CustomerCard } from 'src/components/users/cards';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useListCustomerQuery } from 'src/redux-toolkit/services/adminApi';
import { paths } from 'src/routes/paths';

const CustomerListingView = () => {
  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);

  // api state
  const listResponse = useListCustomerQuery();

  // update list response
  useEffect(() => {
    if (user?.id) {
      listResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // render the list
  const renderList = useCallback(
    (data = []) => {
      if (!listResponse.isLoading && listResponse.isError) {
        return <ErrorState />;
      }

      if (listResponse?.data?.success && !data?.length) {
        return <EmptyState />;
      }

      if (listResponse?.data?.success && data) {
        return (
          <Grid container spacing={1}>
            {data.map((customer) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={customer.id}>
                <CustomerCard user={customer} totalWarehouses={10} />
              </Grid>
            ))}
          </Grid>
        );
      }

      return <LoadingState />;
    },
    [listResponse?.data?.success, listResponse.isError, listResponse.isLoading]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Customers"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'customers' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {renderList(listResponse?.data?.results || [])}

      <Stack direction="row" justifyContent="center" mt={8} mb={1}>
        <Pagination count={10} color="primary" size="small" />
      </Stack>
    </Container>
  );
};

export default CustomerListingView;
