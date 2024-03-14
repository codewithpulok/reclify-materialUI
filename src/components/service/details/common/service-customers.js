import { Box, Card, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import Image from 'src/components/common/image';
import { ServiceDetailsBox } from '../../box';

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
const ServiceCustomers = (props) => {
  const { data = [], sx } = props;

  const carousel = useCarousel({
    slidesToShow: 4,
    infinite: data?.length >= 4,
    autoplay: true,
    autoplaySpeed: 1500,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, infinite: data?.length >= 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, infinite: data?.length >= 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, infinite: data?.length >= 1 },
      },
    ],
  });

  return (
    <ServiceDetailsBox
      title="Featured Client List"
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
                  sx={{ borderRadius: 1, py: 1, height: '120px' }}
                  component={Stack}
                  alignItems="center"
                  justifyContent="center"
                >
                  {item?.image && <Image src={item.image} />}
                  {!item?.image && item?.name && <Typography variant="h5">{item.name}</Typography>}
                </Card>
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </ServiceDetailsBox>
  );
};

ServiceCustomers.propTypes = Props;

export default ServiceCustomers;
