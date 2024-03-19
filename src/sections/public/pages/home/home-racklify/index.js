import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import data from './data.json';

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
            {data.map((card, index) => (
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
                    <Image
                      src={`/assets/images/home/${card.image}`}
                      width={100}
                      height={100}
                      alt={card.title}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8PxMAAp0BmiC7I60AAAAASUVORK5CYII="
                    />

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
