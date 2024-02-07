import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/common/iconify';

import { NewsCard, NewsCardSkeleton } from 'src/components/news/cards';

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

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <NewsCardSkeleton />
        </Grid>
      ))}
    </>
  );

  const renderList = (
    <>
      {posts.map((post, index) => (
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

      {posts.length > 8 && (
        <Stack
          alignItems="center"
          sx={{
            mt: 8,
            mb: { xs: 10, md: 15 },
          }}
        >
          <Button
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} />}
          >
            Load More
          </Button>
        </Stack>
      )}
    </>
  );
};

NewsPostList.propTypes = Props;

export default NewsPostList;
