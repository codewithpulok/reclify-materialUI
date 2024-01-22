'use client';

import { m } from 'framer-motion';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Grid } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/common/animate';
import { getIconify } from 'src/components/common/iconify/utilities';

// ----------------------------------------------------------------------

const CARDS = [
  {
    id: '1',
    icon: 'noto:rocket',
    title: 'Welcome to the future of warehousing!',
    description: `At Racklify, we're reshaping the logistics industry by introducing a groundbreaking platform that connects businesses with top warehousing and fulfillment providers across the country. Say goodbye to uncertainty and unexpected costs - Racklify guarantees the best rates and ensures a seamless booking experience for both warehouse providers and users.`,
  },
  {
    id: '2',
    icon: 'noto:globe-with-meridians',
    title: 'Discover Your Perfect Space',
    description: `Tired of sifting through endless options? With Racklify, finding the ideal storage space is a breeze. Our platform showcases a curated selection of vetted warehouses, offering on-demand storage solutions at guaranteed prices. Whether you need short-term or long-term storage, we've got you covered.`,
  },
  {
    id: '3',
    icon: 'noto:briefcase',
    title: 'Save Big with Guaranteed Rates',
    description: `No more hidden fees or unexpected charges. Racklify eliminates the guesswork by providing transparent and guaranteed pallet rates. We've given the tools to warehouses to offer the best rates, saving you money and ensuring a stress-free storage experience.`,
  },
  {
    id: '4',
    icon: 'noto:alarm-clock',
    title: 'HotRacks - Limited Time Deals',
    description: `Ready for unbeatable savings? Explore our exclusive HotRacks, where deeply discounted and time-limited listings await. Jump on these promotions to enjoy even more cost-effective storage solutions. It's a win-win for businesses seeking budget-friendly options as well as warehouses with extra capacity.`,
  },
  {
    id: '5',
    icon: 'noto:counterclockwise-arrows-button',
    title: 'Matchmaking Made Easy',
    description: `Are you a warehouse owner looking to maximize your space utilization? Or a business in need of reliable storage? Racklify is the perfect matchmaker! Join our two-sided marketplace and unlock a world of opportunities for both warehouse and end user`,
  },
  {
    id: '6',
    icon: 'noto:package',
    title: 'Beyond Storage',
    description: `Racklify isn't just about storage - it's a comprehensive platform offering various services to streamline your logistics. From freight and consulting to packaging and manufacturing, we've got everything you need under one roof.`,
  },
];

// ----------------------------------------------------------------------

export default function HomeRacklify() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            Racklify
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">How Racklify helps you</Typography>
        </m.div>
      </Stack>

      <Grid container justifyContent="center" spacing={{ xs: 3 }}>
        {CARDS.map((card) => (
          <Grid item sm={12} md={4} key={card.id}>
            <Card
              component={Stack}
              sx={{
                textAlign: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                p: (theme) => theme.spacing(10, 5),
              }}
            >
              {getIconify(card.icon, 58)}

              <Typography variant="h5" sx={{ mt: 7, mb: 2 }}>
                {card.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {card.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
