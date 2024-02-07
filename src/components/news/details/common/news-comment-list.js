import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import NewsCommentItem from './news-comment-item';

// ----------------------------------------------------------------------

const Props = {
  comments: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsCommentList = (props) => {
  const { comments } = props;
  return (
    <>
      <>
        {comments.map((comment) => {
          const { id, name, message, avatarUrl, postedAt } = comment;

          return (
            <Box key={id}>
              <NewsCommentItem
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
};

NewsCommentList.propTypes = Props;

export default NewsCommentList;
