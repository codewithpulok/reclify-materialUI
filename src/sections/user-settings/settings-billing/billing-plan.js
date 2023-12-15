import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { useBoolean } from 'src/hooks/use-boolean';

import { AddressListDialog, PaymentCardListDialog } from 'src/components/user-settings/dialog';

import PlanCard from 'src/components/user-settings/cards/plan-card';

import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const BillingPlanProps = {
  /** @type {Plan[]} */
  plans: PropTypes.array,
  /** @type {Address[]} */
  addressBook: PropTypes.array,
  /** @type {Card[]} */
  cards: PropTypes.array,
};

/**
 * Billing plans
 * @param {BillingPlanProps} props
 * @returns
 */
const BillingPlan = (props) => {
  const { plans, addressBook, cards } = props;

  const primaryAddress = addressBook.find((address) => address.primary);
  const primaryCard = cards.find((card) => card.primary);

  const openAddress = useBoolean();
  const openCards = useBoolean();

  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(primaryAddress);

  const [selectedCard, setSelectedCard] = useState(primaryCard);

  const handleSelectPlan = useCallback(
    (newValue) => {
      const currentPlan = plans.filter((plan) => plan.primary)[0].subscription;
      if (currentPlan !== newValue) {
        setSelectedPlan(newValue);
      }
    },
    [plans]
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

        <Stack spacing={2} sx={{ p: 3, pt: 0, typography: 'body2' }}>
          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Plan
            </Grid>
            <Grid xs={12} md={8} sx={{ typography: 'subtitle2', textTransform: 'capitalize' }}>
              {selectedPlan || '-'}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing name
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openAddress.onTrue}
                endIcon={ICONS.showMore(16)}
                sx={{ typography: 'subtitle2', p: 0, borderRadius: 0 }}
              >
                {selectedAddress?.name}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing address
            </Grid>
            <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
              {selectedAddress?.fullAddress}
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

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Payment method
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openCards.onTrue}
                endIcon={ICONS.showMore(16)}
                sx={{ typography: 'subtitle2', p: 0, borderRadius: 0 }}
              >
                {selectedCard?.cardNumber}
              </Button>
            </Grid>
          </Grid>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3 }}>
          <Button variant="outlined">Cancel Plan</Button>
          <Button variant="contained" color="success">
            Upgrade Plan
          </Button>
        </Stack>
      </Card>

      <PaymentCardListDialog
        list={cards}
        open={openCards.value}
        onClose={openCards.onFalse}
        selected={(selectedId) => selectedCard?.id === selectedId}
        onSelect={handleSelectCard}
      />

      <AddressListDialog
        list={addressBook}
        open={openAddress.value}
        onClose={openAddress.onFalse}
        selected={(selectedId) => selectedAddress?.id === selectedId}
        onSelect={handleSelectAddress}
        action={
          <Button size="small" startIcon={ICONS.plus()} sx={{ alignSelf: 'flex-end' }}>
            New
          </Button>
        }
      />
    </>
  );
};

BillingPlan.propTypes = BillingPlanProps;

export default BillingPlan;
