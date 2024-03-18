'use client';

import { Container, Stack } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useLazySearchAllQuery } from 'src/redux-toolkit/services/searchApi';
import { paths } from 'src/routes/paths';
import RenderQuerySearch from 'src/sections/private/dashboard/search/common/render-query-search';
import RenderTypeSearch from 'src/sections/private/dashboard/search/common/render-type-search';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchListView = (props) => {
  const router = useRouter();
  const appearance = useAppearance();

  // searchparam states
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const type = searchParam.get('type');
  const region = searchParam.get('region');
  const service = searchParam.get('service');
  const subtypes = searchParam.get('subtypes');

  // check valid type filter or not
  const hasTypeFilter = useMemo(() => type === 'warehouse' || type === 'service', [type]);
  // parse page heading based on search params
  const pageHeading = useMemo(() => {
    if (typeof query === 'string' && !!query.trim()) return `You've searched for - ${query}`;

    if (hasTypeFilter) return 'Showing Filtered Data';

    return undefined;
  }, [hasTypeFilter, query]);

  // api state
  const [searchAll, searchResponse] = useLazySearchAllQuery();

  // make request on search
  useEffect(() => {
    if (!query && !type) {
      router.push(paths.dashboard.root); // there is nothing related to search then redirect
    } else {
      searchAll({ query, type, region, service, subtypes });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, region, service, subtypes, type]);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={pageHeading}
          links={[{ name: 'Home', href: paths.root }, { name: 'Search' }]}
        />

        {hasTypeFilter ? (
          <RenderTypeSearch
            type={type}
            data={searchResponse.data?.results}
            isError={searchResponse.isError || searchResponse.data?.isError}
            isLoading={searchResponse.isLoading || searchResponse.isFetching}
            isSuccess={searchResponse.isSuccess}
          />
        ) : (
          <RenderQuerySearch
            data={searchResponse.data?.results}
            isError={searchResponse.isError || searchResponse.data?.isError}
            isLoading={searchResponse.isLoading || searchResponse.isFetching}
            isSuccess={searchResponse.isSuccess}
            servicesPath={paths.dashboard.search.services(query)}
            usersPath={paths.dashboard.search.users(query)}
            warehousesPath={paths.dashboard.search.warehouses(query)}
          />
        )}
      </Stack>
    </Container>
  );
};

SearchListView.propTypes = Props;

export default SearchListView;
