import { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

import PlanCard from 'src/components/user-settings/cards/plan-card';

import { CardContent, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanCancelDialog, PlanUpgradeDialog } from 'src/components/common/custom-dialog';
import { ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

// ----------------------------------------------------------------------

const Props = {
  plans: PropTypes.array,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const RenderProps = {
  ...Props,
  showAnnual: PropTypes.bool,
  selectedPlan: PropTypes.string,
  handleSelectPlan: PropTypes.func,
  currentPlan: PropTypes.string,
};

// ----------------------------------------------------------------------

const RenderPlans = (props) => {
  const {
    plans,
    isSuccess,
    isError,
    isLoading,
    showAnnual,
    selectedPlan,
    handleSelectPlan,
    currentPlan,
  } = props;

  // error state
  if (!isLoading && isError) {
    return <ErrorState />;
  }

  // success state
  if (!isLoading && isSuccess && Array.isArray(plans)) {
    return plans?.map((plan) => (
      <Grid xs={12} md={4} key={plan.id}>
        <PlanCard
          isSelected={plan.id === selectedPlan}
          onSelect={handleSelectPlan}
          plan={plan}
          isCurrent={currentPlan === plan.id}
          showAnnual={showAnnual}
        />
      </Grid>
    ));
  }

  // loading state
  return <LoadingState />;
};
RenderPlans.propTypes = RenderProps;

// ----------------------------------------------------------------------

/**
 * Billing plans
 * @param {Props} props
 * @returns
 */
const BillingPlan = (props) => {
  const { plans = [], isError, isSuccess, isLoading } = props;
  const { user } = useAppSelector(selectAuth);

  // app state
  const isAnnual = useBoolean();

  // dialog state
  const upgradeDialog = useDialog();
  const cancelPlan = useDialog();

  const currentPlan = useMemo(() => user?.planId || null, [user]);
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const handleSelectPlan = useCallback((newValue) => {
    setSelectedPlan(newValue);
  }, []);

  // update selected plan
  useEffect(() => {
    if (currentPlan) {
      setSelectedPlan(currentPlan);
    }
  }, [currentPlan]);

  return (
    <>
      <Card>
        <CardHeader
          title="Plan"
          action={
            <FormControlLabel
              label="Annually"
              labelPlacement="start"
              control={<Switch onChange={(_e, c) => isAnnual.setValue(c)} value={isAnnual.value} />}
            />
          }
        />

        <CardContent>
          <Grid container spacing={1.5}>
            <RenderPlans
              currentPlan={currentPlan}
              handleSelectPlan={handleSelectPlan}
              isError={isError}
              isLoading={isLoading}
              isSuccess={isSuccess}
              plans={plans}
              selectedPlan={selectedPlan}
              showAnnual={isAnnual.value}
            />
          </Grid>
        </CardContent>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <CardContent
          sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}
        >
          <Button
            variant="outlined"
            onClick={cancelPlan.onOpen}
            disabled={!currentPlan || currentPlan === 'free'}
          >
            Cancel Current Plan
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={currentPlan === selectedPlan}
            onClick={() => upgradeDialog.onOpen(selectedPlan)}
          >
            Upgrade Plan
          </Button>
        </CardContent>
      </Card>

      <PlanUpgradeDialog
        onClose={upgradeDialog.onClose}
        open={upgradeDialog.open}
        planId={upgradeDialog.value}
      />
      <PlanCancelDialog onClose={cancelPlan.onClose} open={cancelPlan.open} />
    </>
  );
};

BillingPlan.propTypes = Props;

export default BillingPlan;
