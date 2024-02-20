import { m } from 'framer-motion';
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import { alpha } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/common/animate';
import Image from 'src/components/common/image';
import { bgGradient } from 'src/theme/css';
import ContactForm from '../contact/contact-form';

// ----------------------------------------------------------------------

export default function HomeJoin() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3} mb={8}>
      <Image
        src="/assets/images/home/3d-warehouse.png"
        sx={{ borderRadius: 1, maxWidth: 180, width: '100%', mx: 'auto' }}
      />
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          Experience the future of warehousing.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ color: 'common.white' }}>
          Join the Racklify Revolution
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'grey.500' }}>
          Join Racklify today and take control of your storage solutions. Whether you&apos;re a
          warehouse looking to optimize space or a business seeking affordable and reliable storage,
          Racklify is your go-to destination. Ready to revolutionize your storage experience? Sign
          up now and elevate your business with Racklify!
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Box
      sx={(theme) => ({
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.89),
          imgUrl: '/assets/images/home/join_racklify.jpg',
        }),
      })}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        <Box sx={{ maxWidth: '700px', width: '100%', mx: 'auto' }}>
          <m.div variants={varFade().inUp}>
            <ContactForm
              textFieldProps={{
                InputProps: { sx: { color: '#FFF' } },
                InputLabelProps: { sx: { color: '#FFF!important' } },
              }}
            />
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
