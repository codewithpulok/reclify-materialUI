'use client';

import { Box, Stack, Switch, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { MotionDiv, varFade } from 'src/components/common/animate';
import { PlanCard } from 'src/components/user-settings/cards';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { paths } from 'src/routes/paths';

/**
 * @param {PricingContent.propTypes} props
 * @returns {JSX.Element}
 */
const PricingContent = (props) => {
  const { data } = props;

  // app states
  const mdUp = useResponsive('up', 'md');
  const [currentTab, setCurrentTab] = useState('free');
  const isAnnual = useBoolean();

  // ACTIONS ----------------------------------------------------------------------

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderDesktopContent = (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      sx={{
        gap: 1.5,
      }}
    >
      {data.map((plan, index) => (
        <MotionDiv
          key={plan.id}
          variants={varFade({ durationIn: Number((0.3 * index + 0.64).toFixed(2)) }).inUp}
          style={{ height: '100%' }}
        >
          <PlanCard
            showAnnual={isAnnual.value}
            plan={plan}
            isPopular={index === 1}
            href={paths.settings.subscriptions}
            sx={{ height: '100%' }}
          />
        </MotionDiv>
      ))}
    </Box>
  );

  const renderMobileContent = (
    <Stack>
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
        {data.map(
          (plan) =>
            plan.id === currentTab && (
              <PlanCard
                key={plan.id}
                plan={plan}
                href={paths.settings.subscriptions}
                showAnnual={isAnnual.value}
              />
            )
        )}
      </Box>
    </Stack>
  );

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" mb={5} spacing={0.5}>
        <Typography variant="subtitle1">MONTHLY</Typography>
        <Switch value={isAnnual.value} onChange={(_e, v) => isAnnual.setValue(v)} color="primary" />
        <Typography variant="subtitle1">YEARLY</Typography>
      </Stack>
      {mdUp ? renderDesktopContent : renderMobileContent}
    </>
  );
};

PricingContent.propTypes = {
  data: PropTypes.array,
};

export default PricingContent;
