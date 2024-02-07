'use client';

import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { fShortenNumber } from 'src/utils/format-number';

import { useGetPost } from 'src/utils/blog';

import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import EmptyContent from 'src/components/common/empty-content';
import Iconify from 'src/components/common/iconify';
import Markdown from 'src/components/common/markdown';

import NewsCommentForm from './common/news-comment-form';
import NewsCommentList from './common/news-comment-list';
import NewsDetailsHero from './common/news-details-hero';
import PostList from './common/news-list';
import NewsDetailsSkeleton from './details-skeleton';

// ----------------------------------------------------------------------

const Props = {
  title: PropTypes.string,
};

const NewsDetails = ({ title }) => {
  const { post, postError, postLoading } = useGetPost(title);

  const renderSkeleton = <NewsDetailsSkeleton />;

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${postError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.news.root}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

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

          <Stack
            spacing={3}
            sx={{
              py: 3,
              borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
              borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {post.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="soft" />
              ))}
            </Stack>

            <Stack direction="row" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    color="error"
                    icon={<Iconify icon="solar:heart-bold" />}
                    checkedIcon={<Iconify icon="solar:heart-bold" />}
                  />
                }
                label={fShortenNumber(post.totalFavorites)}
                sx={{ mr: 1 }}
              />

              <AvatarGroup>
                {post.favoritePerson.map((person) => (
                  <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
                ))}
              </AvatarGroup>
            </Stack>
          </Stack>

          <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
            <Typography variant="h4">Comments</Typography>

            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
              ({post.comments.length})
            </Typography>
          </Stack>

          <NewsCommentForm />

          <Divider sx={{ mt: 5, mb: 2 }} />

          <NewsCommentList comments={post.comments} />
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
      {postLoading && renderSkeleton}

      {postError && renderError}

      {post && renderPost}

      <Container sx={{ pb: 15 }}>{renderLatestPosts}</Container>
    </>
  );
};

NewsDetails.propTypes = Props;
export default NewsDetails;
