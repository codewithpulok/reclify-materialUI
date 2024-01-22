import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import PostCommentItem from './post-comment-item';

// ----------------------------------------------------------------------

export default function PostCommentList({ comments }) {
  return (
    <>
      <>
        {comments.map((comment) => {
          const { id, name, message, avatarUrl, postedAt } = comment;

          return (
            <Box key={id}>
              <PostCommentItem
                name={name}
                message={message}
                postedAt={postedAt}
                avatarUrl={avatarUrl}
              />
            </Box>
          );
        })}
      </>

      <Pagination count={8} sx={{ my: 5, mx: 'auto' }} />
    </>
  );
}

PostCommentList.propTypes = {
  comments: PropTypes.array,
};
