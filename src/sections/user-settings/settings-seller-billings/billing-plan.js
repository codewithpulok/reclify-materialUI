import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { useBoolean } from 'src/hooks/use-boolean';

import PlanCard from 'src/components/user-settings/cards/plan-card';

import { SubscriptionPaymentDialog } from 'src/components/common/custom-dialog';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Plan[]} */
  plans: PropTypes.array,
};

/**
 * Billing plans
 * @param {Props} props
 * @returns
 */
const BillingPlan = (props) => {
  const { plans } = props;

  const currentPlan = useMemo(() => plans.filter((plan) => plan.primary)[0].subscription, [plans]);

  const openPaymentForm = useBoolean();

  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const handleSelectPlan = useCallback(
    (newValue) => {
      if (currentPlan !== newValue) {
        setSelectedPlan(newValue);
      }
    },
    [currentPlan]
  );

  const renderPlans = plans.map((plan) => (
    <Grid xs={12} md={4} key={plan.subscription}>
      <PlanCard
        isSelected={plan.subscription === selectedPlan}
        onSelect={handleSelectPlan}
        plan={plan}
      />
    </Grid>
  ));

  return (
    <>
      <Card>
        <CardHeader title="Plan" />

        <Grid container spacing={1.5} sx={{ p: 3 }}>
          {renderPlans}
        </Grid>

        <Stack spacing={1.5} sx={{ p: 3, pt: 0, typography: 'body2' }}>
          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Plan
            </Grid>
            <Grid xs={12} md={8} sx={{ typography: 'subtitle2', textTransform: 'capitalize' }}>
              {selectedPlan || '-'}
            </Grid>
          </Grid>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3 }}>
          <Button variant="outlined">Cancel Current Plan</Button>
          <Button
            variant="contained"
            color="success"
            disabled={currentPlan === selectedPlan}
            onClick={openPaymentForm.onTrue}
          >
            Upgrade Plan
          </Button>
        </Stack>
      </Card>

      <SubscriptionPaymentDialog open={openPaymentForm.value} onClose={openPaymentForm.onFalse} />
    </>
  );
};

BillingPlan.propTypes = Props;

export default BillingPlan;
