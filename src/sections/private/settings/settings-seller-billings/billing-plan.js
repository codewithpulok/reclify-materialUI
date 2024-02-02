import { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { useBoolean } from 'src/hooks/use-boolean';

import PlanCard from 'src/components/user-settings/cards/plan-card';

import { SubscriptionPaymentDialog } from 'src/components/common/custom-dialog';
import { ErrorState, LoadingState } from 'src/components/common/custom-state';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { usePlanListQuery } from 'src/redux-toolkit/services/planApi';

// ----------------------------------------------------------------------

const Props = {};

/**
 * Billing plans
 * @param {Props} props
 * @returns
 */
const BillingPlan = (props) => {
  const { user } = useAppSelector(selectAuth);

  const currentPlan = useMemo(() => user?.planId || null, [user]);

  // api state
  const listResponse = usePlanListQuery();

  const openPaymentForm = useBoolean();
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const handleSelectPlan = useCallback((newValue) => {
    setSelectedPlan(newValue);
  }, []);

  const renderPlans = useMemo(() => {
    // error state
    if (listResponse.isError || listResponse?.data?.isError) {
      return <ErrorState />;
    }

    // success state
    if (listResponse.isSuccess && listResponse?.data?.success) {
      return listResponse?.data?.results?.map((plan) => (
        <Grid xs={12} md={4} key={plan.id}>
          <PlanCard
            isSelected={plan.id === selectedPlan}
            onSelect={handleSelectPlan}
            plan={plan}
            isCurrent={currentPlan === plan.id}
          />
        </Grid>
      ));
    }

    // loading state
    return <LoadingState />;
  }, [
    currentPlan,
    handleSelectPlan,
    listResponse?.data?.isError,
    listResponse?.data?.results,
    listResponse?.data?.success,
    listResponse.isError,
    listResponse.isSuccess,
    selectedPlan,
  ]);

  // update selected plan
  useEffect(() => {
    if (currentPlan) {
      setSelectedPlan(currentPlan);
    }
  }, [currentPlan]);

  return (
    <>
      <Card>
        <CardHeader title="Plan" />

        <Grid container spacing={1.5} sx={{ p: 3 }}>
          {renderPlans}
        </Grid>

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
