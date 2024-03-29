import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useGetBillingQuery } from 'src/redux-toolkit/services/billingApi';
import BillingSection from '../common/billing-section';
import BillingHistory from './billing-history';
import OnboardingStatus from './billing-onboarding-status';
import BillingPlan from './billing-plan';

// ----------------------------------------------------------------------

const SettingsSellerBillings = (props) => {
  const { user } = useAppSelector(selectAuth);

  // api state
  const billingResponse = useGetBillingQuery();

  // call api on user id changed
  useEffect(() => {
    if (user?.id) {
      billingResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OnboardingStatus />
      </Grid>

      <Grid item xs={12}>
        <BillingPlan
          plans={billingResponse?.data?.results?.plans}
          isError={billingResponse?.isError}
          isLoading={billingResponse?.isLoading || billingResponse?.isFetching}
          isSuccess={billingResponse?.isSuccess}
          annualPlan={billingResponse?.data?.results?.annualPlan}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <BillingSection
          primaryACH={billingResponse?.data?.results?.primaryACH}
          primaryCard={billingResponse?.data?.results?.primaryCard}
          primaryBillingInfo={billingResponse?.data?.results?.primaryBillingInfo}
          isLoading={billingResponse.isLoading || billingResponse.isFetching}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <BillingHistory invoices={billingResponse?.data?.results?.invoices || []} />
      </Grid>
    </Grid>
  );
};

export default SettingsSellerBillings;
