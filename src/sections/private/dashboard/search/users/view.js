'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useSettingsContext } from 'src/components/common/settings';
import { CustomerCard, SellerCard } from 'src/components/users/cards';
import { useLazySearchUsersQuery } from 'src/redux-toolkit/services/searchApi';
import { paths } from 'src/routes/paths';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchUsersView = (props) => {
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const settings = useSettingsContext();

  // api state
  const [searchUsers, searchResponse] = useLazySearchUsersQuery();
  const isLoading = useMemo(
    () => searchResponse.isLoading || searchResponse.isFetching,
    [searchResponse.isLoading, searchResponse.isFetching]
  );

  // make request on search
  useEffect(() => {
    if (query) searchUsers(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // render users
  const renderUsers = useCallback(
    (data = []) => {
      if (!isLoading && searchResponse.isError) {
        return <ErrorState />;
      }

      if (!isLoading && searchResponse.data?.success && !data.length) {
        return <EmptyState />;
      }

      if (!isLoading && searchResponse.data?.success && data) {
        return (
          <Grid container spacing={1}>
            {data.map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                {user.userType === 'seller' && <SellerCard user={user} totalWarehouses={10} />}
                {user.userType === 'customer' && (
                  <CustomerCard user={user} totalTransactions={100} />
                )}
                {user.userType === 'admin' && <CustomerCard user={user} totalTransactions={1000} />}
              </Grid>
            ))}
          </Grid>
        );
      }

      return <LoadingState />;
    },
    [isLoading, searchResponse.data?.success, searchResponse.isError]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Search', href: paths.dashboard.search.results(query) },
            { name: 'Users' },
          ]}
        />

        {renderUsers(searchResponse.data?.results || [])}

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      </Stack>
    </Container>
  );
};

SearchUsersView.propTypes = Props;

export default SearchUsersView;
