// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport } from 'src/components/common/animate';

// ----------------------------------------------------------------------

const list = [
  {
    id: 1,
    title: '5 Star Rating - Premier Excellence',
    definition:
      '* Reserved for Class A Buildings\n* Multi-location establishments\n* Distinguished as a premier provider in the industry\n* Encompasses all conceivable amenities for an unparalleled experience',
  },
  {
    id: 2,
    title: '4 Star Rating - Superior Quality',
    definition:
      '* Applicable to Class A or B Buildings\n* Presence in multiple locations\n* Offers an extensive array of amenities, ensuring a comfortable and enriching environment',
  },
  {
    id: 3,
    title: '3 Star Rating - Above Average Standard',
    definition:
      '* Applies to Class A or B Buildings\n* Can be single or multi-location\n* Provides amenities that meet the industry average, ensuring a satisfactory experience',
  },
  {
    id: 4,
    title: '2 Star Rating - Adequate Facilities',
    definition:
      '* Designated for Class B or C Buildings\n* Singular facility locations\n* Offers limited amenities but fulfills essential needs',
  },
  {
    id: 5,
    title: '1 Star Rating - Basic Utilitarian',
    definition:
      '* Assigned to Class B or C Buildings\n* Single facility establishments\n* Limited amenities, suitable for basic use',
  },
];

export default function SectionContent() {
  return (
    <Box
      sx={{
        pb: 10,
        mt: 10,
      }}
    >
      <Container component={MotionViewport}>
        <Stack spacing={2}>
          <Typography>
            Racklify Ratings provides a detailed and nuanced evaluation system to assess the quality
            and features of different facilities. Our comprehensive rubric aims to provide a
            thorough analysis, considering various aspects of buildings and their amenities. The
            ratings are categorized as follows:
          </Typography>
          {list.map((item) => (
            <Stack spacing={0.8} key={item.id}>
              <Typography variant="h6">{item.title}:</Typography>
              <Typography whiteSpace="pre-line">{item.definition}</Typography>
            </Stack>
          ))}
          <Typography>
            Our enhanced rubric considers the type of building, its class, the number of locations,
            and the range of amenities provided, offering a more comprehensive and detailed
            assessment to guide users in making informed decisions about their facility choices.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
