import Grid from '@mui/material/Unstable_Grid2';

import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { achInfos } from 'src/assets/dummy/ach';
import { getInvoicesByUserId } from 'src/assets/dummy/invoices';
import { getAllPlans } from 'src/assets/dummy/plans';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useBillingInfoPrimaryQuery } from 'src/redux-toolkit/services/billingInfoApi';
import { useCardPrimaryQuery } from 'src/redux-toolkit/services/cardApi';
import BillingHistory from './billing-history';
import BillingInfo from './billing-info';
import BillingPlan from './billing-plan';

// ----------------------------------------------------------------------

const SettingsSellerBillings = (props) => {
  const { user } = useAppSelector(selectAuth);

  // api state
  const primaryBillingInfoResponse = useBillingInfoPrimaryQuery();
  const primaryCardResponse = useCardPrimaryQuery();
  const primaryACHResponse = {
    isLoading: false,
    isError: false,
    isSuccess: true,
    data: {
      /** @type {ACHType} */
      results: achInfos[0],
      success: true,
    },
    refetch: () => {},
  };

  const userInvoices = getInvoicesByUserId('2') || getInvoicesByUserId(user?.id);
  const plans = getAllPlans();

  // call api on user id changed
  useEffect(() => {
    if (user?.id) {
      primaryBillingInfoResponse.refetch();
      primaryCardResponse.refetch();
      primaryACHResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Grid container spacing={3} disableEqualOverflow>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <BillingPlan plans={plans} />
          <BillingInfo
            primaryACH={primaryACHResponse?.data?.results}
            primaryCard={primaryCardResponse?.data?.results}
            primaryBillingInfo={primaryBillingInfoResponse?.data?.results}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <BillingHistory invoices={userInvoices} />
      </Grid>
    </Grid>
  );
};

export default SettingsSellerBillings;
