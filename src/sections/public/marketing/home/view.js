'use client';

import { useScroll } from 'framer-motion';
// mui
import { Box } from '@mui/material';
// components
import PropTypes from 'prop-types';
import ScrollProgress from 'src/components/common/scroll-progress';
import MainLayout from 'src/layouts/main';
import HomeFeaturedNews from './home-featured-news';
import HomeHero from './home-hero';
import HomeJoin from './home-join';
import HomePricing from './home-pricing';
import HomeRacklify from './home-racklify';
import HomeRoadmap from './home-roadmap';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Plan[]} */
  plans: PropTypes.array,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const HomeView = (props) => {
  const { plans } = props;
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
        <HomeRoadmap />
        {!!plans?.length && <HomePricing data={plans} />}
        <HomeJoin />
      </Box>
    </MainLayout>
  );
};

HomeView.propTypes = Props;

export default HomeView;
