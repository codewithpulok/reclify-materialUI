// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components

import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import { LeftRoadmap, RightRoadmap, RoadmapItems } from './roadmap-timeline';

// ----------------------------------------------------------------------

export default function HomeRoadmap() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <MotionDiv variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          Roadmap
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inUp}>
        <Typography variant="h2">How Racklify Started</Typography>
      </MotionDiv>
    </Stack>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        <RightRoadmap>
          <RoadmapItems />
        </RightRoadmap>

        <LeftRoadmap>
          <RoadmapItems />
        </LeftRoadmap>
      </Container>
    </Box>
  );
}
