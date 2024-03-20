// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport } from 'src/components/common/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Box
      sx={{
        pb: 10,
        mt: 10,
      }}
    >
      <Container component={MotionViewport}>
        <Stack spacing={1}>
          <Typography>
            At the heart of our mission is the commitment to revolutionize the logistics landscape
            by seamlessly connecting individuals and businesses in search of storage space with our
            expansive network of partner warehouses. Our journey began with a deep-rooted
            understanding of the challenges faced by warehouses, drawing from over four decades of
            experience in operating a family-owned warehouse.
          </Typography>
          <Typography>
            Through this extensive background, we pinpointed the struggles associated with both
            short and long-term vacancy, sparking the inspiration to create a transformative
            solution. In addition to addressing vacancy concerns, we recognized a prevalent issue
            within the industry – a lack of pricing transparency and trust, particularly voiced by
            first-time 3PL (third-party logistics) clients. This revelation fueled our determination
            to establish Racklify as more than just a marketplace but as a beacon of transparency
            and reliability. Racklify stands as a testament to our commitment to transparency,
            offering a marketplace that is not only user-friendly but also fosters trust.
          </Typography>
          <Typography>
            We meticulously curate a selection of pre-vetted warehouse operators and service
            providers, ensuring that you are connected with reliable partners who align with your
            unique needs. Whether you are navigating the complexities of short-term storage or
            seeking a long-term logistics solution, Racklify is here to simplify your journey.
            Explore our transparent marketplace, discover pre-vetted operators, and embark on a
            seamless experience tailored to finding your perfect fit. Join us on this transformative
            logistics journey, where Racklify redefines the way you connect with warehouse solutions
            – making storage space accessible, pricing transparent, and trust paramount.
          </Typography>
          <Typography>
            Racklify Ratings provides a detailed and nuanced evaluation system to assess the quality
            and features of different facilities. Our comprehensive rubric aims to provide a
            thorough analysis, considering various aspects of buildings and their amenities.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
