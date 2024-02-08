import { m } from 'framer-motion';
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Paper, alpha } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/common/animate';
import Iconify from 'src/components/common/iconify';

// ----------------------------------------------------------------------

export default function HomeRoadmap() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          Roadmap
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2">How Racklify Started</Typography>
      </m.div>
    </Stack>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Container component={MotionViewport}>{renderDescription}</Container>
      <Roadmap />
    </Box>
  );
}

const TIMELINES = [
  {
    key: 1,
    title: '2024',
    des: '',
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
  },
  {
    key: 2,
    title: 'Title 1',
    des: 'Closed Beta Launch - Invite Only - Warehouse and Service Provider Marketplace. List and sell extra capacity and meet new customers and providers.',
    color: 'primary',
    icon: <Iconify icon="eva:image-2-fill" width={24} />,
  },
  {
    key: 3,
    title: 'Title 2',
    des: 'Public Launch & Racklify News',
    color: 'secondary',
    icon: <Iconify icon="eva:pantone-fill" width={24} />,
  },
  {
    key: 4,
    title: 'Title 3',
    des: 'Additional features for current providers & Launch of Commercial Real Estate features.',
    color: 'info',
    icon: <Iconify icon="eva:tv-fill" width={24} />,
  },
];

const Roadmap = () => (
  <Timeline position="alternate">
    {TIMELINES.map((item) => (
      <TimelineItem key={item.key}>
        <TimelineSeparator>
          <TimelineDot color={item.color}>{item.icon}</TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            sx={{
              p: 3,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
          >
            <Typography variant="subtitle2">{item.title}</Typography>
            {!!item?.des && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {item.des}
              </Typography>
            )}
          </Paper>
        </TimelineContent>
      </TimelineItem>
    ))}
  </Timeline>
);