'use client';

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { MotionDiv, varFade } from 'src/components/common/animate';
import Iconify from 'src/components/common/iconify';
import { alpha } from 'src/utils/color';

export const RightRoadmap = ({ children }) => (
  <Timeline
    position="right"
    sx={{
      display: {
        xs: 'block',
        md: 'none',
      },
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
    }}
  >
    {children}
  </Timeline>
);

export const LeftRoadmap = ({ children }) => (
  <Timeline
    position="alternate"
    sx={{
      display: {
        xs: 'none',
        md: 'block',
      },
    }}
  >
    {children}
  </Timeline>
);

RightRoadmap.propTypes = {
  children: PropTypes.node,
};

LeftRoadmap.propTypes = {
  children: PropTypes.node,
};

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

export const RoadmapItems = () => (
  <>
    {TIMELINES.map((item, index) => (
      <TimelineItem key={item.key}>
        <TimelineSeparator>
          <TimelineDot color={item.color}>{item.icon}</TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <MotionDiv
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
          </MotionDiv>
        </TimelineContent>
      </TimelineItem>
    ))}
  </>
);
