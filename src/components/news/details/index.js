'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import Markdown from 'src/components/common/markdown';

import NewsCommentForm from './common/news-comment-form';
import NewsCommentList from './common/news-comment-list';
import NewsDetailsHero from './common/news-details-hero';
import PostList from './common/news-list';

// ----------------------------------------------------------------------

const Props = {
  post: PropTypes.object,
};

const NewsDetails = (props) => {
  const { post } = props;

  const renderPost = post && (
    <>
      <NewsDetailsHero
        title={post.title}
        author={post.author}
        coverUrl={post.coverUrl}
        createdAt={post.createdAt}
      />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'News',
              href: paths.news.root,
            },
            {
              name: post?.title,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
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

          <NewsCommentList comments={post?.comments || []} />
        </Stack>
      </Container>
    </>
  );

  const renderLatestPosts = (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Recent Posts
      </Typography>

      <PostList posts={[]} loading={false} />
    </>
  );

  return (
    <>
      {post && renderPost}

      <Container sx={{ pb: 15 }}>{renderLatestPosts}</Container>
    </>
  );
};

NewsDetails.propTypes = Props;
export default NewsDetails;
