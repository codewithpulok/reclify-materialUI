import Grid from '@mui/material/Unstable_Grid2';

import { getBillingAddressByUserId } from 'src/assets/dummy/billing-address';
import { getInvoicesByUserId } from 'src/assets/dummy/invoices';
import { getPaymentCardsByUserId } from 'src/assets/dummy/payment-cards';
import { getAllPlans } from 'src/assets/dummy/plans';
import { useAuthContext } from 'src/auth/hooks';
import BillingHistory from './billing-history';
import BillingPlan from './billing-plan';

// ----------------------------------------------------------------------

const SettingsSellerBillings = (props) => {
  const { user } = useAuthContext();

  const userInvoices = getInvoicesByUserId(user?.id);
  const billingAddressBook = getBillingAddressByUserId(user?.id);
  const paymentCards = getPaymentCardsByUserId(user?.id);
  const plans = getAllPlans();

  return (
    <Grid container spacing={3} disableEqualOverflow>
      <Grid item xs={12} md={8}>
        <BillingPlan plans={plans} paymentCards={paymentCards} addressBook={billingAddressBook} />
      </Grid>

      <Grid item xs={12} md={4}>
        <BillingHistory invoices={userInvoices} />
      </Grid>
    </Grid>
  );
};

export default SettingsSellerBillings;