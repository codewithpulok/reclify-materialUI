'use client';

import orderBy from 'lodash/orderBy';
import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import Iconify from 'src/components/common/iconify';
import Label from 'src/components/common/label';
import { useSettingsContext } from 'src/components/common/settings';

import NewsSearch from 'src/components/news/news-search';
import NewsSort from 'src/components/news/news-sort';
import { useBlogListQuery } from 'src/redux-toolkit/services/blogApi';
import { paramCase } from 'src/utils/change-case';
import ViewList from './view-list';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: 'all',
};

const TAB_OPTIONS = [
  { label: 'All', value: 'all', color: 'info', check: (v) => true },
  { label: 'Published', value: 'published', color: 'default', check: (v) => !v?.isPublished },
  { label: 'Draft', value: 'draft', color: 'default', check: (v) => v?.isPublished },
];

// ----------------------------------------------------------------------

export default function NewsListingView() {
  const settings = useSettingsContext();

  // api states
  const listResponse = useBlogListQuery();

  // app states
  const [sortBy, setSortBy] = useState('latest');
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);

  const dataFiltered = applyFilter({
    inputData: listResponse?.data?.results,
    filters,
    sortBy,
  });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      handleFilters('publish', newValue);
    },
    [handleFilters]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="News List"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'News',
            href: paths.dashboard.news.root,
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.news.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Post
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <NewsSearch
          query={debouncedQuery}
          results={[]}
          onSearch={handleSearch}
          loading={false}
          hrefItem={(title) => paths.dashboard.news.details(paramCase(title))}
        />

        <NewsSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <Tabs
        value={filters.publish}
        onChange={handleFilterPublish}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TAB_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={tab.label}
            icon={
              <Label variant={tab.value === filters.publish ? 'filled' : 'soft'} color={tab.color}>
                {listResponse?.data?.results?.filter(tab.check)?.length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <ViewList posts={dataFiltered} loading={listResponse?.isLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { publish } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  if (publish === 'published') {
    inputData = inputData.filter((post) => post?.isPublished);
  }

  if (publish === 'draft') {
    inputData = inputData.filter((post) => !post?.isPublished);
  }

  return inputData;
};
