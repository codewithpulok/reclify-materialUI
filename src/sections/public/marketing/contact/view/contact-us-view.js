'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ContactForm, { ContactFormDescription } from '../contact-form';
import ContactHero from '../contact-hero';
import ContactMap from '../contact-map';

// ----------------------------------------------------------------------

export default function ContactUsView() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get('scrollTo');

  // scroll to element
  useEffect(() => {
    if (scrollTo === 'FORM') {
      const formElement = document.getElementById(scrollTo);
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollTo]);

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
