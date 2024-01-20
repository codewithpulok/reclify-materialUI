'use client';

import { useScroll } from 'framer-motion';

import ScrollProgress from 'src/components/common/scroll-progress';
import MainLayout from 'src/layouts/main';

import { Box } from '@mui/material';
import HomeHero from './home-hero';
import HomeMinimal from './home-minimal';

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
        <HomeMinimal />
      </Box>
    </MainLayout>
  );
}
