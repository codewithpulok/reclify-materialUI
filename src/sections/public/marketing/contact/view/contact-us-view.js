'use client';

import Container from '@mui/material/Container';

import { Grid, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ContactForm, { ContactFormDescription } from '../contact-form';
import ContactHero from '../contact-hero';

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
        <Stack spacing={5}>
          <ContactFormDescription />
          <Grid container>
            <Grid item xs={12} md={6}>
              <ContactForm />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
