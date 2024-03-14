import { Box, Card, CardContent, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import Iconify from 'src/components/common/iconify';
import { bgGradient } from 'src/theme/css';
import { joinAddressObj } from 'src/utils/address';
import { WarehouseDetailsBox } from '../../box';

const Props = {
  /** @type {SxProps} */
  sx: PropTypes.object,
  /** @type {CustomerList[]} */
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
      title="Additional Addresses"
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
          // filled
          icon="solar:alt-arrow-right-bold"
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{
            sx: { left: 4 },
          }}
          rightButtonProps={{
            sx: { right: 4 },
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.map((item, index) => (
              <Box key={index} sx={{ px: { xs: 0.5, sm: 1 } }}>
                <Card
                  sx={(theme) => ({
                    borderRadius: 1,
                    py: 1,
                    minHeight: '120px',
                    ...bgGradient({
                      color: alpha(
                        theme.palette.background.default,
                        theme.palette.mode === 'light' ? 0.8 : 0.94
                      ),
                      imgUrl: '/assets/placeholder/address.jpg',
                    }),
                  })}
                >
                  <CardContent>
                    <Iconify
                      icon="solar:map-point-bold-duotone"
                      width={32}
                      sx={{ color: 'primary.main' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                      {joinAddressObj(item)}
                    </Typography>
                  </CardContent>
                </Card>
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
