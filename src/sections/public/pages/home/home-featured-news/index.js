import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import NewsCarousel from './news-carousel';
import NewsContainer from './news-container';

// ----------------------------------------------------------------------

export default function HomeFeaturedNews() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3} mb={10}>
      <MotionDiv variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          News
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inUp}>
        <Typography variant="h2">Featured Racklify News</Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inUp}>
        <Typography sx={{ color: 'text.secondary' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni est optio obcaecati fuga
          maxime ex accusantium repudiandae, quae repellat eius!
        </Typography>
      </MotionDiv>
    </Stack>
  );

  return (
    <NewsContainer>
      <MotionViewport>
        <Container>
          {renderDescription}
          <NewsCarousel />
        </Container>
      </MotionViewport>
    </NewsContainer>
  );
}
