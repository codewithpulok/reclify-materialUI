'use client';

import Container from '@mui/material/Container';

import { Grid, Stack } from '@mui/material';
import { ScrollTo } from 'src/routes/components';
import ContactForm, { ContactFormDescription } from '../contact-form';
import ContactHero from '../contact-hero';

// ----------------------------------------------------------------------

export default function ContactUsView() {
  return (
    <>
      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Stack spacing={5}>
          <ContactFormDescription />
          <Grid container>
            <Grid item xs={12} md={6}>
              <ScrollTo id="FORM" />
              <ContactForm />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
