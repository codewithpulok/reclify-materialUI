'use client';

import { Box, Stack, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { PlanCard } from 'src/components/user-settings/cards';

/**
 * @param {PricingMobile.propTypes} props
 * @returns {JSX.Element}
 */
const PricingMobile = (props) => {
  const [currentTab, setCurrentTab] = useState('free');
  const { data } = props;
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Stack sx={{ display: { md: 'none' } }}>
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
    </Stack>
  );
};

PricingMobile.propTypes = {
  data: PropTypes.array,
};

export default PricingMobile;
