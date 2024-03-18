import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Box, Grid } from '@mui/material';
import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import Image from 'src/components/common/image';

// ----------------------------------------------------------------------

const CARDS = [
  {
    id: '1',
    image: 'mini_rocket.png',
    title: 'Welcome to the future of warehousing!',
    description: `At Racklify, we're reshaping the logistics industry by introducing a groundbreaking platform that connects businesses with top warehousing and fulfillment providers across the country. Say goodbye to uncertainty and unexpected costs - Racklify guarantees the best rates and ensures a seamless booking experience for both warehouse providers and users.`,
  },
  {
    id: '2',
    image: 'mini_earth.png',
    title: 'Discover Your Perfect Space',
    description: `Tired of sifting through endless options? With Racklify, finding the ideal storage space is a breeze. Our platform showcases a curated selection of vetted warehouses, offering on-demand storage solutions at guaranteed prices. Whether you need short-term or long-term storage, we've got you covered.`,
  },
  {
    id: '3',
    image: 'mini_suitcase.png',
    title: 'Save Big with Guaranteed Rates',
    description: `No more hidden fees or unexpected charges. Racklify eliminates the guesswork by providing transparent and guaranteed pallet rates. We've given the tools to warehouses to offer the best rates, saving you money and ensuring a stress-free storage experience.`,
  },
  {
    id: '4',
    image: 'mini_alarm.png',
    title: 'HotRacks - Limited Time Deals',
    description: `Ready for unbeatable savings? Explore our exclusive HotRacks, where deeply discounted and time-limited listings await. Jump on these promotions to enjoy even more cost-effective storage solutions. It's a win-win for businesses seeking budget-friendly options as well as warehouses with extra capacity.`,
  },
  {
    id: '5',
    image: 'mini_owner.png',
    title: 'Matchmaking Made Easy',
    description: `Are you a warehouse owner looking to maximize your space utilization? Or a business in need of reliable storage? Racklify is the perfect matchmaker! Join our two-sided marketplace and unlock a world of opportunities for both warehouse and end user`,
  },
  {
    id: '6',
    image: 'mini_box.png',
    title: 'Beyond Storage',
    description: `Racklify isn't just about storage - it's a comprehensive platform offering various services to streamline your logistics. From freight and consulting to packaging and manufacturing, we've got everything you need under one roof.`,
  },
];

// ----------------------------------------------------------------------

export default function HomeRacklify() {
  return (
    <Box sx={{ py: { xs: 10, md: 15 } }}>
      <MotionViewport>
        <Container>
          <Stack
            spacing={3}
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 10 },
            }}
          >
            <MotionDiv variants={varFade().inUp}>
              <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
                Racklify
              </Typography>
            </MotionDiv>

            <MotionDiv variants={varFade().inDown}>
              <Typography variant="h2">How Racklify helps you</Typography>
            </MotionDiv>
          </Stack>

          <Grid container justifyContent="center" spacing={{ xs: 3 }}>
            {CARDS.map((card, index) => (
              <Grid item sm={12} md={4} key={card.id}>
                <MotionDiv
                  variants={varFade({ durationIn: Number((0.3 * index + 0.64).toFixed(2)) }).inUp}
                  style={{ height: '100%' }}
                >
                  <Card
                    component={Stack}
                    sx={{
                      textAlign: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      px: 5,
                      py: 10,
                    }}
                  >
                    <Image src={`/assets/images/home/${card.image}`} sx={{ width: '100px' }} />

                    <Typography variant="h5" sx={{ mt: 7, mb: 2 }}>
                      {card.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {card.description}
                    </Typography>
                  </Card>
                </MotionDiv>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}
