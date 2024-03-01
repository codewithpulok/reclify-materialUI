'use client';

import { m } from 'framer-motion';
import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import PropTypes from 'prop-types';
import { MotionViewport, varFade } from 'src/components/common/animate';
import { PlanCard } from 'src/components/user-settings/cards';
import { ScrollTo } from 'src/routes/components';
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Plan[]} */
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const HomePricing = (props) => {
  const { data } = props;
  const mdUp = useResponsive('up', 'md');
  const [currentTab, setCurrentTab] = useState('free');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderDescription = (
    <Stack spacing={3} sx={{ mb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          pricing plans
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">
          The right plan for <br /> your business
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Choose the perfect plan for your needs. Always flexible to grow
        </Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <>
      {mdUp ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{
            gap: 1.5,
          }}
        >
          {data.map((plan, index) => (
            <m.div
              key={plan.id}
              variants={varFade({ durationIn: Number((0.3 * index + 0.64).toFixed(2)) }).inUp}
            >
              <PlanCard plan={plan} />
            </m.div>
          ))}
        </Box>
      ) : (
        <>
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {data.map((tab) => (
                <Tab key={tab.id} value={tab.id} label={tab.title} />
              ))}
            </Tabs>
          </Stack>

          <Box
            sx={{
              borderRadius: 2,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {data.map((plan) => plan.id === currentTab && <PlanCard key={plan.id} plan={plan} />)}
          </Box>
        </>
      )}
    </>
  );

  return (
    <Box
      sx={(theme) => ({
        py: { xs: 10, md: 15 },
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.85 : 0.94
          ),
          imgUrl: '/assets/images/home/plans.jpg',
        }),
      })}
    >
      <Container component={MotionViewport}>
        <ScrollTo id="PRICING" />
        {renderDescription}

        {renderContent}
      </Container>
    </Box>
  );
};

HomePricing.propTypes = Props;

export default HomePricing;
