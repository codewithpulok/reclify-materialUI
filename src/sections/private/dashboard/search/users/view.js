'use client';

import { Container, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import usePagination from 'src/hooks/use-pagination';
import { useLazySearchUsersQuery } from 'src/redux-toolkit/services/searchApi';
import { paths } from 'src/routes/paths';
import RenderUsers from '../../users/common/render-users';

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

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(
    searchResponse?.data?.results,
    12
  );

  // make request on search
  useEffect(() => {
    if (query) searchUsers(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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

        <RenderUsers
          isError={searchResponse.isError}
          isFetching={searchResponse.isFetching}
          isLoading={searchResponse.isLoading}
          isSuccess={searchResponse.isSuccess}
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

SearchUsersView.propTypes = Props;

export default SearchUsersView;
