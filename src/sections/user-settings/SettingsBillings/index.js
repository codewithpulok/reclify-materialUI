import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';

import BillingHistory from './BillingHistory';
import BillingPlan from './BillingPlan';

// ----------------------------------------------------------------------

const SettingsBillings = (props) => {
  const { cards, plans, invoices, addressBook } = props;
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <BillingPlan plans={plans} cardList={cards} addressBook={addressBook} />

        {/* <AccountBillingPayment cards={cards} /> */}
      </Grid>

      <Grid xs={12} md={4}>
        <BillingHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
};

SettingsBillings.propTypes = {
  addressBook: PropTypes.array,
  cards: PropTypes.array,
  invoices: PropTypes.array,
  plans: PropTypes.array,
};

export default SettingsBillings;
