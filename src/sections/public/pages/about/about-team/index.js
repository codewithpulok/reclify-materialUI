import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import TeamCarousel from './team-carousel';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  return (
    <Container component={MotionViewport} sx={{ textAlign: 'center', py: { xs: 10, md: 15 } }}>
      <MotionDiv variants={varFade().inDown}>
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          Dream team
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Great team is the key
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inUp}>
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
      </MotionDiv>

      <TeamCarousel />
    </Container>
  );
}
