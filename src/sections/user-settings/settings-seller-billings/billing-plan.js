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

import {
  BillingAddressListDialog,
  PaymentCardListDialog,
  PaymentDialog,
} from 'src/components/common/custom-dialog';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const BillingPlanProps = {
  /** @type {Plan[]} */
  plans: PropTypes.array,
  /** @type {BillingAddress[]} */
  addressBook: PropTypes.array,
  /** @type {PaymentCard[]} */
  paymentCards: PropTypes.array,
};

/**
 * Billing plans
 * @param {BillingPlanProps} props
 * @returns
 */
const BillingPlan = (props) => {
  const { plans, addressBook, paymentCards } = props;

  const primaryAddress = useMemo(
    () => addressBook.find((address) => address.primary),
    [addressBook]
  );
  const primaryCard = useMemo(() => paymentCards.find((card) => card.primary), [paymentCards]);
  const currentPlan = useMemo(() => plans.filter((plan) => plan.primary)[0].subscription, [plans]);

  const openAddress = useBoolean();
  const openCards = useBoolean();
  const openPaymentForm = useBoolean();

  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [selectedAddress, setSelectedAddress] = useState(primaryAddress);

  const [selectedCard, setSelectedCard] = useState(primaryCard);

  const handleSelectPlan = useCallback(
    (newValue) => {
      if (currentPlan !== newValue) {
        setSelectedPlan(newValue);
      }
    },
    [currentPlan]
  );

  const handleSelectAddress = useCallback((newValue) => {
    setSelectedAddress(newValue);
  }, []);

  const handleSelectCard = useCallback((newValue) => {
    setSelectedCard(newValue);
  }, []);

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

        <Grid container spacing={2} sx={{ p: 3 }}>
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

          <Grid container spacing={{ xs: 0.5, md: 2 }} alignItems="center">
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing name
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openAddress.onTrue}
                endIcon={ICONS.showMore(16)}
                variant="outlined"
                size="small"
                sx={{ typography: 'subtitle2' }}
              >
                {selectedAddress?.fullName}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing address
            </Grid>
            <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
              {getWarehouseAddress(selectedAddress?.address)}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing phone number
            </Grid>
            <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
              {selectedAddress?.phoneNumber}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }} alignItems="center">
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Payment method
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openCards.onTrue}
                endIcon={ICONS.showMore(16)}
                variant="outlined"
                size="small"
                sx={{ typography: 'subtitle2' }}
              >
                {selectedCard?.holder} - {selectedCard?.number}
              </Button>
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

      <PaymentCardListDialog
        list={paymentCards}
        open={openCards.value}
        onClose={openCards.onFalse}
        selected={(selectedId) => selectedCard?.id === selectedId}
        onSelect={handleSelectCard}
      />

      <BillingAddressListDialog
        list={addressBook}
        open={openAddress.value}
        onClose={openAddress.onFalse}
        selected={(selectedId) => selectedAddress?.id === selectedId}
        onSelect={handleSelectAddress}
      />

      <PaymentDialog open={openPaymentForm.value} onClose={openPaymentForm.onFalse} />
    </>
  );
};

BillingPlan.propTypes = BillingPlanProps;

export default BillingPlan;
