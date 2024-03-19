// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import Image from 'next/image';
import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import warehouse from '../../../../../public/assets/images/home/3d-warehouse.png';
import ContactForm from '../contact/contact-form';

// ----------------------------------------------------------------------

export default function HomeJoin() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3} mb={8}>
      <MotionDiv variants={varFade().inUp}>
        <Box
          component={Image}
          src={warehouse}
          width={180}
          height={124}
          sx={{ borderRadius: 1, maxWidth: 180, width: '100%' }}
          placeholder="blur"
        />
      </MotionDiv>
      <MotionDiv variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          Experience the future of warehousing.
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inUp}>
        <Typography variant="h2" sx={{ color: 'common.white' }}>
          Join the Racklify Revolution
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inUp}>
        <Typography sx={{ color: 'grey.500' }}>
          Join Racklify today and take control of your storage solutions. Whether you&apos;re a
          warehouse looking to optimize space or a business seeking affordable and reliable storage,
          Racklify is your go-to destination. Ready to revolutionize your storage experience? Sign
          up now and elevate your business with Racklify!
        </Typography>
      </MotionDiv>
    </Stack>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
        bgcolor: 'grey.900',
      }}
    >
      <MotionViewport>
        <Container>
          {renderDescription}

          <Box sx={{ maxWidth: '700px', width: '100%', mx: 'auto' }}>
            <MotionDiv variants={varFade().inUp}>
              <ContactForm
                textFieldProps={{
                  InputProps: { sx: { color: '#FFF' } },
                  InputLabelProps: { sx: { color: '#FFF!important' } },
                }}
              />
            </MotionDiv>
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}
