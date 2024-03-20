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
          {data.map((item) => (
            <Stack spacing={0.8} key={item.id}>
              <Typography variant="h6">{item.title}:</Typography>
              <Typography>
                <Typography variant="subtitle1" component="span">
                  Definition:{' '}
                </Typography>
                {item.definition}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
