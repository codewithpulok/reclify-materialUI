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
            experience in operating a family-owned warehouse.{' '}
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
            thorough analysis, considering various aspects of buildings and their amenities.{' '}
          </Typography>
          <Typography>
            The ratings are categorized as follows: <br />5 Diamonds Rating - Premier Excellence:
            Reserved for Class A Buildings Multi-location establishments Distinguished as a premier
            provider in the industry Encompasses all conceivable amenities for an unparalleled
            experience <br />4 Diamonds Rating - Superior Quality: Applicable to Class A or B
            Buildings Presence in multiple locations Offers an extensive array of amenities,
            ensuring a comfortable and enriching environment <br />3 Diamonds Rating - Above Average
            Standard: Applies to Class A or B Buildings Can be single or multi-location Provides
            amenities that meet the industry average, ensuring a satisfactory experience <br />2
            Diamonds Rating - Adequate Facilities: Designated for Class B or C Buildings Singular
            facility locations Offers limited amenities but fulfills essential needs <br />1 Diamond
            Rating - Basic Utilitarian: Assigned to Class B or C Buildings Single facility
            establishments Limited amenities, suitable for basic use Our enhanced rubric considers
            the type of building, its class, the number of locations, and the range of amenities
            provided, offering a more comprehensive and detailed assessment to guide users in making
            informed decisions about their facility choices.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
