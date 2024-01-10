import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import { WarehouseCard } from 'src/components/warehouse/cards';

const Props = {
  /** @type {Warehouse[]} */
  data: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseCarousel = (props) => {
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
        leftButtonProps={{ disabled: carousel.currentIndex === 0 }}
        rightButtonProps={{ disabled: carousel.currentIndex === data.length - 1 }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <WarehouseCard warehouse={item} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

WarehouseCarousel.propTypes = Props;

export default WarehouseCarousel;
