import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import { ServiceCard } from 'src/components/service/cards';

const Props = {
  /** @type {Service[]} */
  data: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceCarousel = (props) => {
  const { data } = props;

  const carousel = useCarousel({
    slidesToShow: 3,
    infinite: false,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        '& .slick-track': {
          ml: 0,
        },
      }}
    >
      <CarouselArrows
        filled
        icon="solar:alt-arrow-right-bold"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        // leftButtonProps={{ disabled: !carousel?.hasPrev }}
        // rightButtonProps={{ disabled: !carousel?.hasNext }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <ServiceCard service={item} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

ServiceCarousel.propTypes = Props;

export default ServiceCarousel;
