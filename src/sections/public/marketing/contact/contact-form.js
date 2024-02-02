import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { MotionViewport, varFade } from 'src/components/common/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <Stack spacing={1}>
        <Typography>
          {`Whether you're taking the first steps toward listing your services or embarking on a
          search for the ideal warehousing space, Racklify is your partner in navigating the
          logistics landscape.`}
        </Typography>
        <Typography>
          {`We welcome your inquiries and are eager to assist you here at Racklify. Whether you're a
          warehouse or service provider seeking to join our esteemed platform or an individual in
          search of warehouse space, our team is ready to provide the support you need.`}
        </Typography>
        <Typography>
          Feel free to reach out if you have questions, require guidance, or simply want to explore
          the possibilities of being listed on our site.{' '}
        </Typography>
        <Typography>
          Your satisfaction is our priority, and we look forward to connecting with you.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Name" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Email" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Subject" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Enter your message here." multiline rows={4} />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </m.div>
    </Stack>
  );
}
