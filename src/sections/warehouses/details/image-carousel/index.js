'use client';

import Card from '@mui/material/Card';
import PropTypes from 'prop-types';

import Carousel, {
  CarouselArrows,
  CarouselDots,
  useCarousel,
} from 'src/components/common/carousel';
import CarouselItem from './carousel-item';

const Props = {
  list: PropTypes.array,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} params
 * @returns {JSX.Element}
 */
const ImageCarousel = (props) => {
  const { list = [], sx = {}, ...other } = props;
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

  if (!list.length) return null;

  return (
    <Card sx={sx} {...other}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.id} item={app} active={index === carousel.currentIndex} />
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

ImageCarousel.propTypes = Props;
export default ImageCarousel;
