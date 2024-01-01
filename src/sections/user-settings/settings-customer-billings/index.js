import { Grid } from '@mui/material';

import { getInvoicesByUserId, getPaymentCardsByUserId } from 'src/assets/dummy';
import { getBillingAddressByUserId } from 'src/assets/dummy/billing-address';
import { useAuthContext } from 'src/auth/hooks';
import BillingHistory from './billing-history';
import BillingInfo from './billing-info';

const SettingsCustomerBillingsProps = {};
const SettingsCustomerBillings = (props) => {
  const { user } = useAuthContext();

  const invoices = getInvoicesByUserId(user?.id);
  const billingAddressBook = getBillingAddressByUserId(user?.id);
  const paymentCards = getPaymentCardsByUserId(user?.id);

  return (
    <Grid container spacing={3} disableEqualOverflow>
      <Grid item xs={12} md={8}>
        <BillingInfo paymentCards={paymentCards} addressBook={billingAddressBook} />
      </Grid>

      <Grid item xs={12} md={4}>
        <BillingHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
};

SettingsCustomerBillings.propTypes = SettingsCustomerBillingsProps;

export default SettingsCustomerBillings;
