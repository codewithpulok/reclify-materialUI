import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import { WarehouseCard } from 'src/components/warehouse/cards';

const Props = {
  /** @type {Warehouse[]} */
  data: PropTypes.array,
  itemProps: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseFeaturedCarousel = (props) => {
  const { data = [], itemProps = {} } = props;

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

  const filteredData = useMemo(() => data?.filter((d) => d.isFeatured), [data]);

  if (!filteredData.length) return null;

  return (
    <Box
      sx={{
        overflowX: 'hidden',
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
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {filteredData.map((item) => (
            <Box key={item.id} sx={{ px: 1, my: '8px' }}>
              <WarehouseCard warehouse={item} {...itemProps} sx={{ minHeight: '100%' }} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

WarehouseFeaturedCarousel.propTypes = Props;

export default WarehouseFeaturedCarousel;
