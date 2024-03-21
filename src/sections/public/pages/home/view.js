// mui
import { Box } from '@mui/material';
// components
import PropTypes from 'prop-types';
import MainLayout from 'src/layouts/main';
import HomeFeaturedNews from './home-featured-news';
import HomeHero from './home-hero/index';
import HomePricing from './home-pricing/index';
import HomeProgress from './home-progress';
import HomeRacklify from './home-racklify/index';

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

  return (
    <MainLayout contentSx={{ pt: 0 }}>
      <HomeProgress />
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
        {!!plans?.length && <HomePricing data={plans} />}
      </Box>
    </MainLayout>
  );
};

HomeView.propTypes = Props;

export default HomeView;
