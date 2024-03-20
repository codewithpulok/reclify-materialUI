'use client';

import { Box } from '@mui/material';
import { MotionDiv, varFade } from 'src/components/common/animate';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import data from './data.json';
import TeamCard from './team-card';

// ----------------------------------------------------------------------

const TeamCarousel = (props) => {
  const carousel = useCarousel({
    infinite: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselArrows
        filled
        shape="rounded"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        leftButtonProps={{
          sx: {
            left: 24,
            ...(data.length < 5 && { display: 'none' }),
          },
        }}
        rightButtonProps={{
          sx: {
            right: 24,
            ...(data.length < 5 && { display: 'none' }),
          },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((member) => (
            <Box
              key={member.id}
              component={MotionDiv}
              variants={varFade().in}
              sx={{
                px: 1.5,
                py: { xs: 8, md: 10 },
              }}
            >
              <TeamCard {...member} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

TeamCarousel.propTypes = {};

export default TeamCarousel;
