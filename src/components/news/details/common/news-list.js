import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { Pagination } from '@mui/material';
import { NewsCard, NewsCardSkeleton } from 'src/components/news/cards';
import usePagination from 'src/hooks/use-pagination';

// ----------------------------------------------------------------------

const Props = {
  loading: PropTypes.bool,
  /** @type {NewsType[]} */
  posts: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsPostList = (props) => {
  const { posts, loading } = props;

  const { currentData, currentPage, goTo, totalPages } = usePagination(posts, 12);

  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <NewsCardSkeleton />
        </Grid>
      ))}
    </>
  );

  const renderList = (
    <>
      {currentData.map((post, index) => (
        <Grid key={post.id} xs={12} sm={6} md={3}>
          <NewsCard post={post} key={post.id} />
        </Grid>
      ))}
    </>
  );

  return (
    <>
      <Grid container spacing={3}>
        {loading ? renderSkeleton : renderList}
      </Grid>

      {!!totalPages && (
        <Stack direction="row" justifyContent="center" my={7}>
          <Pagination
            count={totalPages}
            color="primary"
            size="small"
            page={currentPage}
            onChange={(_e, page) => goTo(page)}
          />
        </Stack>
      )}
    </>
  );
};

NewsPostList.propTypes = Props;

export default NewsPostList;
