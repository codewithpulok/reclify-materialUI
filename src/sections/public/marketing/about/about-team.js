import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { MotionViewport, varFade } from 'src/components/common/animate';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import Image from 'src/components/common/image';

// ----------------------------------------------------------------------

const teams = [
  {
    id: '1',
    avatar: '/assets/images/about/teams/brian.jpeg',
    name: 'Brian Antar',
    bio: 'CEO, Shipmate Fulfillment',
  },
  {
    id: '2',
    avatar: '/assets/images/about/teams/bill.jpg',
    name: 'Bill Carlin',
    bio: 'CMO, Shipmate Fulfillment',
  },
  {
    id: '3',
    avatar: '/assets/images/about/teams/andrew.jpg',
    name: 'Andrew Antar',
    bio: 'Co-Founder & President of Tune.fm',
  },
];

// ----------------------------------------------------------------------

export default function AboutTeam() {
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
    <Container component={MotionViewport} sx={{ textAlign: 'center', py: { xs: 10, md: 15 } }}>
      <m.div variants={varFade().inDown}>
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          Dream team
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Great team is the key
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Racklify will provide you support if you have any problems, our support team will reply
          within a day and we also have detailed documentation.
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          filled
          shape="rounded"
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{
            sx: {
              left: 24,
              ...(teams.length < 5 && { display: 'none' }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: 24,
              ...(teams.length < 5 && { display: 'none' }),
            },
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {teams.map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade().in}
                sx={{
                  px: 1.5,
                  py: { xs: 8, md: 10 },
                }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function MemberCard({ member }) {
  const { name, bio, avatar } = member;
  return (
    <Card key={name}>
      <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {bio}
      </Typography>

      <Box sx={{ px: 1 }}>
        <Image alt={name} src={avatar} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>
    </Card>
  );
}

MemberCard.propTypes = {
  member: PropTypes.object,
};
