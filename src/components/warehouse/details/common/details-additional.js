import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import { WarehouseDetailsBox } from '../../box';
import { WarehouseSimpleCard } from '../../cards';

const Props = {
  /** @type {SxProps} */
  sx: PropTypes.object,
  /** @type {Warehouse[]} */
  data: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsAdditional = (props) => {
  const { data = [], sx } = props;

  const carousel = useCarousel({
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    initialSlide: 0,
    swipeToSlide: true,
  });

  return (
    <WarehouseDetailsBox
      title="Additional Warehouses"
      sx={sx}
      contentSx={{ overflow: 'hidden', position: 'relative', px: 0 }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          '& .slick-track': {
            ml: 0,
            py: 2,
          },
        }}
      >
        <CarouselArrows
          filled
          icon="solar:alt-arrow-right-bold"
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{}}
          rightButtonProps={{}}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.map((item, index) => (
              <Box key={index} sx={{ px: { xs: 0.5, sm: 1 } }}>
                <WarehouseSimpleCard warehouse={item} key={item.id} sx={{ boxShadow: 0 }} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </WarehouseDetailsBox>
  );
};

DetailsAdditional.propTypes = Props;

export default DetailsAdditional;
