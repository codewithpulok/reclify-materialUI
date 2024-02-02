'use client';

import { useScroll } from 'framer-motion';
// mui
import { Box } from '@mui/material';
// components
import ScrollProgress from 'src/components/common/scroll-progress';
import MainLayout from 'src/layouts/main';
import HomeFeaturedNews from './home-featured-news';
import HomeHero from './home-hero';
import HomeJoin from './home-join';
import HomeRacklify from './home-racklify';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <HomeHero />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeRacklify />
        <HomeFeaturedNews />
        <HomeJoin />
      </Box>
    </MainLayout>
  );
}
