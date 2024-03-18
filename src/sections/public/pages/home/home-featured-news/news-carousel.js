'use client';

import { Box } from '@mui/material';
import { useMemo } from 'react';
import { MotionDiv, varFade } from 'src/components/common/animate';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import { NewsCard } from 'src/components/news/cards';
import { useBlogListQuery } from 'src/redux-toolkit/services/blogApi';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsCarousel = (props) => {
  const listResponse = useBlogListQuery();
  const featuredNews = useMemo(
    () =>
      listResponse?.data?.results ? listResponse.data?.results?.filter((n) => n.isFeatured) : [],
    [listResponse.data?.results]
  );

  const carousel = useCarousel({
    slidesToShow: 4,
    infinite: featuredNews?.length >= 4,
    autoplay: true,
    autoplaySpeed: 1500,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, infinite: featuredNews?.length >= 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, infinite: featuredNews?.length >= 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, infinite: featuredNews?.length >= 1 },
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
      component={MotionDiv}
      variants={varFade().inDown}
    >
      <CarouselArrows
        filled
        icon="solar:alt-arrow-right-bold"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {featuredNews.map((item, index) => (
            <Box key={item.id} sx={{ px: { xs: 0.5, sm: 1 } }}>
              <NewsCard post={item} index={index} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

NewsCarousel.propTypes = Props;

export default NewsCarousel;
