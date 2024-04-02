'use client';

import orderBy from 'lodash/orderBy';
import { useCallback, useMemo, useState } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_mock';

import NewsPostList from 'src/components/news/details/common/news-list';
import NewsFeatured from 'src/components/news/news-featured';

import PropTypes from 'prop-types';
import NewsSearch from 'src/components/news/news-search';
import NewsSort from 'src/components/news/news-sort';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

/**
 * @param {NewsListingView.propTypes} props
 * @returns {JSX.Element}
 */

const NewsListingView = (props) => {
  const { news } = props;
  const appearance = useAppearance();

  // app states
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);

  const dataFiltered = applyFilter({
    inputData: news,
    sortBy,
  });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  // featured news
  const featuredNews = useMemo(() => (news ? news.filter((n) => n.isFeatured) : []), [news]);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Racklify News
      </Typography>

      {!!featuredNews?.length && <NewsFeatured list={featuredNews} sx={{ mb: { xs: 3, md: 5 } }} />}

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
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

      <NewsPostList posts={dataFiltered} />
    </Container>
  );
};

NewsListingView.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
};

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, sortBy }) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc']);
  }

  return inputData;
};

export default NewsListingView;
