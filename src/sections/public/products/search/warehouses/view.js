'use client';

import { Container, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import usePagination from 'src/hooks/use-pagination';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useLazySearchWarehousesQuery } from 'src/redux-toolkit/services/searchApi';
import { paths } from 'src/routes/paths';
import RenderWarehouses from 'src/sections/private/dashboard/warehouses/common/render-warehouses';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchWarehousesView = (props) => {
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const appearance = useAppearance();

  // api state
  const [searchWarehouses, searchResponse] = useLazySearchWarehousesQuery();

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(
    searchResponse?.data?.results
  );

  // make request on search
  useEffect(() => {
    searchWarehouses(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[
            { name: 'Home', href: paths.root },
            { name: 'Search', href: paths.search.results(query) },
            { name: 'Warehouses' },
          ]}
        />

        <RenderWarehouses
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

SearchWarehousesView.propTypes = Props;

export default SearchWarehousesView;
