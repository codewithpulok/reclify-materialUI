import Grid from '@mui/material/Unstable_Grid2';

import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useGetBillingQuery } from 'src/redux-toolkit/services/billingApi';
import BillingSection from '../common/billing-section';
import BillingHistory from './billing-history';
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
  }, [user]);

  return (
    <Grid container spacing={3} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          <BillingPlan
            plans={billingResponse?.data?.results?.plans}
            isError={billingResponse?.isError}
            isLoading={billingResponse?.isLoading || billingResponse?.isFetching}
            isSuccess={billingResponse?.isSuccess}
          />
          <BillingSection
            primaryACH={billingResponse?.data?.results?.primaryACH}
            primaryCard={billingResponse?.data?.results?.primaryCard}
            primaryBillingInfo={billingResponse?.data?.results?.primaryBillingInfo}
            isLoading={billingResponse.isLoading || billingResponse.isFetching}
          />
        </Stack>
      </Grid>

      <Grid xs={12} md={4}>
        <BillingHistory invoices={billingResponse?.data?.results?.invoices || []} />
      </Grid>
    </Grid>
  );
};

export default SettingsSellerBillings;
