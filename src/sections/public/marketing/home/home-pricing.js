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

import { MotionViewport, varFade } from 'src/components/common/animate';
import { PlanCard } from 'src/components/user-settings/cards';

// ----------------------------------------------------------------------

export default function HomePricing() {
  const mdUp = useResponsive('up', 'md');
  const [currentTab, setCurrentTab] = useState('free');

  // api state
  const plansResponse = {
    data: {
      results: [
        {
          id: 'free',
          title: 'Free',
          features: [
            'Includes Basic profile',
            'Unique shareable URL',
            'Instant messaging tool',
            'Available space pricing(not for sale on Racklify)',
            'Adds verfieid badge',
            'Racklify Rating with shareable badge',
            'Google Review integration',
            'Featured above unverified listings',
            'Unlocked ability to sell space through Racklify',
          ],
          price: 0,
          annualPrice: 0,
        },
        {
          id: 'pro',
          title: 'Professional',
          features: [
            'Includes Free features',
            'Verified features',
            'Unlock HotRack deals feature',
            '1 press release',
            'SEO Optimized page',
            'Reporting',
            'Promoted above Verified',
            'Multi-Warehouse: +$20/warehouse/month (required if multi-warehouse)',
          ],
          price: 125,
          annualPrice: 100,
        },
        {
          id: 'enterprise',
          title: 'Enterprise',
          features: [
            'Hero Feature',
            'Direct Advertising',
            'Press Release',
            'Account Sales Manager',
          ],
          price: 0,
          annualPrice: 0,
        },
      ],
    },
    isSuccess: true,
  };

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
          {plansResponse?.data?.results?.map((plan) => (
            <m.div key={plan.id} variants={varFade().in}>
              <PlanCard plan={plan} />
            </m.div>
          ))}
        </Box>
      ) : (
        <>
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {plansResponse?.data?.results?.map((tab) => (
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
            {plansResponse?.data?.results?.map(
              (plan) => plan.id === currentTab && <PlanCard key={plan.id} plan={plan} />
            )}
          </Box>
        </>
      )}
    </>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        {!plansResponse?.isLoading && plansResponse?.isSuccess && renderContent}
      </Container>
    </Box>
  );
}
