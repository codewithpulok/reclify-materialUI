'use client';

import Container from '@mui/material/Container';

import { Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useScrollTo } from 'src/routes/hooks';
import ContactForm, { ContactFormDescription } from '../contact-form';
import ContactHero from '../contact-hero';

// ----------------------------------------------------------------------

export default function ContactUsView() {
  const { scroll } = useScrollTo(undefined, 'FORM');

  // scroll to element
  useEffect(() => {
    scroll();
  }, [scroll]);

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
