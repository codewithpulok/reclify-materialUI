import Grid from '@mui/material/Unstable_Grid2';

import { useEffect } from 'react';
import { getInvoicesByUserId } from 'src/assets/dummy/invoices';
import { getAllPlans } from 'src/assets/dummy/plans';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useBillingInfoPrimaryQuery } from 'src/redux-toolkit/services/billingInfoApi';
import { useCardPrimaryQuery } from 'src/redux-toolkit/services/cardApi';
import BillingHistory from './billing-history';
import BillingPlan from './billing-plan';

// ----------------------------------------------------------------------

const SettingsSellerBillings = (props) => {
  const { user } = useAppSelector(selectAuth);

  // api state
  const primaryBillingInfoResponse = useBillingInfoPrimaryQuery();
  const primaryCardResponse = useCardPrimaryQuery();

  const userInvoices = getInvoicesByUserId('2') || getInvoicesByUserId(user?.id);
  const plans = getAllPlans();

  // call api on user id changed
  useEffect(() => {
    if (user?.id) {
      primaryBillingInfoResponse.refetch();
      primaryCardResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Grid container spacing={3} disableEqualOverflow>
      <Grid item xs={12} md={8}>
        <BillingPlan
          plans={plans}
          primaryCard={primaryCardResponse?.data?.results}
          primaryBillingInfo={primaryBillingInfoResponse?.data?.results}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <BillingHistory invoices={userInvoices} />
      </Grid>
    </Grid>
  );
};

export default SettingsSellerBillings;
