// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport } from 'src/components/common/animate';
import data from './data.json';

// ----------------------------------------------------------------------

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
          {data.map((item) => (
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
