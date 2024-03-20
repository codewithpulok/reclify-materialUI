import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import FaqsHero from './faqs-hero';
import FaqsList from './faqs-list';

// ----------------------------------------------------------------------

export default function FaqsView() {
  return (
    <>
      <FaqsHero />

      <Container
        sx={{
          pb: 10,
          pt: { xs: 4, md: 6 },
          position: 'relative',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            my: { xs: 2, md: 4 },
          }}
        >
          Frequently asked questions
        </Typography>
        <Box>
          <FaqsList />
        </Box>
      </Container>
    </>
  );
}
