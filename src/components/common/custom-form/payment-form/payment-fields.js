import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import BillingDetails from './common/billing-details';
import PaymentCard from './common/payment-card';

export const Props = {
  wrapperElement: PropTypes.elementType,
  actions: PropTypes.node,
  children: PropTypes.node,
  openBillingDialog: PropTypes.func,
  openCardDialog: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PaymentFields = (props) => {
  const {
    wrapperElement,
    actions,
    children = null,
    openBillingDialog = () => {},
    openCardDialog = () => {},
  } = props;

  const methods = useFormContext();
  const { watch } = methods;

  const billingDetails = watch('billing_details', undefined);
  const card = watch('card', undefined);

  return (
    <>
      <Stack component={wrapperElement} sx={{ py: 1 }} spacing={2}>
        <BillingDetails billingDetails={billingDetails} onClick={openBillingDialog} />
        <PaymentCard card={card} onClick={openCardDialog} />
        {children}
      </Stack>

      {actions}
    </>
  );
};

PaymentFields.propTypes = Props;

export default PaymentFields;
