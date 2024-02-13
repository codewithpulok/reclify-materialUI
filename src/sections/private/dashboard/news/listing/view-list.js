import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { Stack } from '@mui/material';
import { NewsDeleteDialog } from 'src/components/common/custom-dialog';
import { EmptyState } from 'src/components/common/custom-state';
import { NewsHorizontalCard, NewsHorizontalCardSkeleton } from 'src/components/news/cards';
import { useDialog } from 'src/hooks/use-dialog';
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
const ViewList = (props) => {
  const { posts, loading } = props;

  const { currentData, currentPage, goTo, totalPages } = usePagination(posts, 12);

  // dialog state
  const deleteDialog = useDialog();

  // render skeleton on loading
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <NewsHorizontalCardSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  // render post list
  const renderList = posts?.length ? (
    <>
      {currentData.map((post) => (
        <NewsHorizontalCard key={post.id} post={post} onDelete={() => deleteDialog.onOpen(post)} />
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

      {!!totalPages && (
        <Stack direction="row" justifyContent="center" my={3}>
          <Pagination
            count={totalPages}
            color="primary"
            size="small"
            page={currentPage}
            onChange={(_e, page) => goTo(page)}
          />
        </Stack>
      )}

      <NewsDeleteDialog
        news={deleteDialog.value}
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};

ViewList.propTypes = Props;
export default ViewList;
