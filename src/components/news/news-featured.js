import PropTypes from 'prop-types';

import Card from '@mui/material/Card';

import Carousel, {
  CarouselArrows,
  CarouselDots,
  useCarousel,
} from 'src/components/common/carousel';
import { NewsFeaturedCard } from './cards';

// ----------------------------------------------------------------------

const Props = {
  list: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsFeatured = (props) => {
  const { list, ...other } = props;

  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((app, index) => (
          <NewsFeaturedCard key={app.id} item={app} active={index === carousel.currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
};

NewsFeatured.propTypes = Props;

export default NewsFeatured;
