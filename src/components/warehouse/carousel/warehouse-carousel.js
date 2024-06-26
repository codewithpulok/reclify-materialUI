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
const WarehouseCarousel = (props) => {
  const { data = [], itemProps = {} } = props;

  const carousel = useCarousel({
    slidesToShow: 5,
    infinite: false,
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

  const filteredData = useMemo(() => data?.filter((d) => !d.isFeatured), [data]);

  if (!filteredData.length) return null;

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
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings} sli>
          {filteredData.map((item) => (
            <Box key={item.id} sx={{ px: 1, my: '8px' }}>
              <WarehouseCard warehouse={item} size="sm" {...itemProps} sx={{ minHeight: '100%' }} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

WarehouseCarousel.propTypes = Props;

export default WarehouseCarousel;
