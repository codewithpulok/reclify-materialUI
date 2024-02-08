'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Stack } from '@mui/material';
import ContactForm, { ContactFormDescription } from '../contact-form';
import ContactHero from '../contact-hero';
import ContactMap from '../contact-map';

// ----------------------------------------------------------------------

export default function ContactUsView() {
  return (
    <>
      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <Stack spacing={5}>
            <ContactFormDescription />
            <ContactForm />
          </Stack>
          <ContactMap />
        </Box>
      </Container>
    </>
  );
}
