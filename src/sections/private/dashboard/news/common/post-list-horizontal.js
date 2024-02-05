import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { NewsDeleteDialog } from 'src/components/common/custom-dialog';
import { EmptyState } from 'src/components/common/custom-state';
import { useDialog } from 'src/hooks/use-dialog';
import PostItemHorizontal from './post-item-horizontal';
import { PostItemSkeleton } from './post-skeleton';

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
export default function PostListHorizontal(props) {
  const { posts, loading } = props;

  // dialog state
  const deleteDialog = useDialog();

  // render skeleton on loading
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <PostItemSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  // render post list
  const renderList = posts?.length ? (
    <>
      {posts.map((post) => (
        <PostItemHorizontal key={post.id} post={post} onDelete={() => deleteDialog.onOpen(post)} />
      ))}
    </>
  ) : (
    <EmptyState sx={{ gridRowStart: 0, gridColumnEnd: 2 }} />
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {posts.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}

      <NewsDeleteDialog
        news={deleteDialog.value}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
}

PostListHorizontal.propTypes = Props;
