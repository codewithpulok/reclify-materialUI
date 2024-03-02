'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';

import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import CreateForm from './create-form';

// ----------------------------------------------------------------------

export default function PostCreateView() {
  const appearance = useAppearance();

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new post"
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
            name: 'Create',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CreateForm />
    </Container>
  );
}
