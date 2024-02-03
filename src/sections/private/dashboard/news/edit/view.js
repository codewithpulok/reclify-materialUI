'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// import { useGetPost } from 'src/api/blog';

import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';

import { useGetPost } from 'src/utils/blog';
import EditForm from './edit-form';

// ----------------------------------------------------------------------

export default function NewsEditView({ title }) {
  const settings = useSettingsContext();

  const { post: currentPost } = useGetPost(`${title}`);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'News',
            href: paths.dashboard.news.root,
          },
          {
            name: currentPost?.title,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EditForm currentPost={currentPost} />
    </Container>
  );
}

NewsEditView.propTypes = {
  title: PropTypes.string,
};
