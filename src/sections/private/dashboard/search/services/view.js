'use client';

import { Container, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import usePagination from 'src/hooks/use-pagination';
import { useLazySearchServicesQuery } from 'src/redux-toolkit/services/searchApi';
import { paths } from 'src/routes/paths';
import RenderServices from '../../services/common/render-services';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchServicesView = (props) => {
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const settings = useSettingsContext();

  // api state
  const [searchServices, searchResponse] = useLazySearchServicesQuery();
  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(
    searchResponse?.data?.results
  );

  // make request on search
  useEffect(() => {
    if (query) searchServices(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Search', href: paths.dashboard.search.results(query) },
            { name: 'Services' },
          ]}
        />

        <RenderServices
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

SearchServicesView.propTypes = Props;

export default SearchServicesView;
