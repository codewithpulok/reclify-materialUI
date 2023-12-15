import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';

import BillingHistory from './billing-history';
import BillingPlan from './billing-plan';

// ----------------------------------------------------------------------

const SettingsBillingProps = {
  /** @type {Address[]} */
  addressBook: PropTypes.array,
  /** @type {Card[]} */
  cards: PropTypes.array,
  /** @type {Invoice[]} */
  invoices: PropTypes.array,
  /** @type {Plan[]} */
  plans: PropTypes.array,
};

const SettingsBilling = (props) => {
  const { cards, plans, invoices, addressBook } = props;
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <BillingPlan plans={plans} cardList={cards} addressBook={addressBook} />
      </Grid>

      <Grid xs={12} md={4}>
        <BillingHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
};

SettingsBilling.propTypes = SettingsBillingProps;

export default SettingsBilling;
