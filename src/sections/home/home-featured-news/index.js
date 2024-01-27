'use client';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useGetPosts } from 'src/utils/blog';

import { Box } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/common/animate';
import NewsCarousel from './news-carousel';

// ----------------------------------------------------------------------

export default function HomeFeaturedNews() {
  const { posts } = useGetPosts();

  const renderDescription = (
    <Stack alignItems="center" spacing={3} mb={10}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          News
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2">Featured Racklify News</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'text.secondary' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni est optio obcaecati fuga
          maxime ex accusantium repudiandae, quae repellat eius!
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}
        <NewsCarousel data={posts || []} />
      </Container>
    </Box>
  );
}
