'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import Markdown from 'src/components/common/markdown';
import NewsCommentForm from './common/news-comment-form';
import NewsCommentList from './common/news-comment-list';
import NewsDetailsHero from './common/news-details-hero';
import NewsPreviewToolbar from './common/news-preview-toolbar';

// ----------------------------------------------------------------------

const Props = {
  /** @type {NewsType} */
  post: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsDetailsPreview = (props) => {
  const { post } = props;

  const renderPost = post && (
    <>
      <NewsPreviewToolbar
        backLink={paths.dashboard.news.root}
        editLink={paths.dashboard.news.edit(post?.id)}
        liveLink={paths.news.details(post?.id)}
        isPublished={post.isPublished}
        onChangePublish={() => {}}
      />

      <NewsDetailsHero title={post.title} coverUrl={post.coverUrl} />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {post.description}
        </Typography>

        <Markdown children={post.content} />

        <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
          <Typography variant="h4">Comments</Typography>

          {post?.comments?.length && (
            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
              ({post?.comments?.length})
            </Typography>
          )}
        </Stack>

        <NewsCommentForm />

        <Divider sx={{ mt: 5, mb: 2 }} />

        {/* TODO: REMOVE STATIC CONTENT */}
        <NewsCommentList comments={[]} />
      </Stack>
    </>
  );

  return <Container maxWidth={false}>{post && renderPost}</Container>;
};

NewsDetailsPreview.propTypes = Props;
export default NewsDetailsPreview;
