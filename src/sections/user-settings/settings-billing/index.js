import Grid from '@mui/material/Unstable_Grid2';

import { getAddressesByUserId } from 'src/assets/dummy/addresses';
import { getCardsByUserId } from 'src/assets/dummy/cards';
import { getInvoicesByUserId } from 'src/assets/dummy/invoices';
import { getAllPlans } from 'src/assets/dummy/plans';
import { useAuthContext } from 'src/auth/hooks';
import BillingHistory from './billing-history';
import BillingPlan from './billing-plan';

// ----------------------------------------------------------------------

const SettingsBilling = (props) => {
  const { user } = useAuthContext();

  const userInvoices = getInvoicesByUserId(user?.id);
  const userAddresses = getAddressesByUserId(user?.id);
  const userCards = getCardsByUserId(user?.id);
  const plans = getAllPlans();

  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <BillingPlan plans={plans} cards={userCards} addressBook={userAddresses} />
      </Grid>

      <Grid xs={12} md={4}>
        <BillingHistory invoices={userInvoices} />
      </Grid>
    </Grid>
  );
};

export default SettingsBilling;
