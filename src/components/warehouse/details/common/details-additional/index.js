import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import { WarehouseDetailsBox } from '../../../box';
import { WarehouseSimpleCard } from '../../../cards';
import ViewMore from './view-more';

const Props = {
  /** @type {SxProps} */
  sx: PropTypes.object,
  /** @type {Warehouse[]} */
  data: PropTypes.array,
  sellerId: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsAdditional = (props) => {
  const { data = [], sellerId, sx } = props;

  const carousel = useCarousel({
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    swipeToSlide: true,
  });

  return (
    <WarehouseDetailsBox
      title="Additional Locations"
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
              <Box key={index} sx={{ px: { xs: 0.5 } }}>
                <WarehouseSimpleCard warehouse={item} key={item.id} sx={{ boxShadow: 0 }} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>

      <Stack width={1} direction="row" alignItems="center" justifyContent="center">
        {data?.length > 2 && <ViewMore id={sellerId} />}
      </Stack>
    </WarehouseDetailsBox>
  );
};

DetailsAdditional.propTypes = Props;

export default DetailsAdditional;
