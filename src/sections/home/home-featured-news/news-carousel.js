import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import PostItem from 'src/sections/news/post-item';

const Props = {
  /** @type {Warehouse[]} */
  data: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsCarousel = (props) => {
  const { data } = props;

  const carousel = useCarousel({
    slidesToShow: 4,
    infinite: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 1500,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
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
          {data.map((item, index) => (
            <Box key={item.id} sx={{ px: { xs: 0.5, sm: 1 } }}>
              <PostItem post={item} index={index} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

NewsCarousel.propTypes = Props;

export default NewsCarousel;
