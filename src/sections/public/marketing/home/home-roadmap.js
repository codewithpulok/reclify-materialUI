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
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Paper, alpha } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/common/animate';
import Iconify from 'src/components/common/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';

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
      sx={(theme) => ({
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.85 : 0.94
          ),
          imgUrl: '/assets/images/home/roadmap.jpg',
        }),
      })}
    >
      <Container component={MotionViewport}>
        {renderDescription}
        <Roadmap />
      </Container>
    </Box>
  );
}

const TIMELINES = [
  {
    key: 1,
    title: '2024',
    des: '',
    color: 'primary',
    icon: <Iconify icon="solar:calendar-bold-duotone" width={24} />,
  },
  {
    key: 2,
    title: 'Q2',
    des: 'Closed Beta Launch - Invite Only - Warehouse and Service Provider Marketplace. List and sell extra capacity and meet new customers and providers.',
    color: 'info',
    icon: <Iconify icon="ph:rocket-launch-duotone" width={24} />,
  },
  {
    key: 3,
    title: 'Q3',
    des: 'Public Launch & Racklify News',
    color: 'error',
    icon: <Iconify icon="ic:twotone-public" width={24} />,
  },
  {
    key: 4,
    title: 'Q4',
    des: 'Additional features for current providers & Launch of Commercial Real Estate features.',
    color: 'warning',
    icon: <Iconify icon="fa-solid:cogs" width={24} />,
  },
];

const Roadmap = () => {
  const smDown = useResponsive('down', 'md');

  return (
    <Timeline
      position={smDown ? 'right' : 'alternate'}
      sx={{
        [`& .${timelineItemClasses.root}:before`]: smDown
          ? {
              flex: 0,
              padding: 0,
            }
          : {},
      }}
    >
      {TIMELINES.map((item, index) => (
        <TimelineItem key={item.key}>
          <TimelineSeparator>
            <TimelineDot color={item.color}>{item.icon}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <m.div
              variants={
                index % 2 === 0
                  ? varFade({ durationIn: Number((0.3 * index + 0.64).toFixed(2)) }).inRight
                  : varFade({ durationIn: Number((0.3 * index + 0.64).toFixed(2)) }).inLeft
              }
            >
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
            </m.div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
