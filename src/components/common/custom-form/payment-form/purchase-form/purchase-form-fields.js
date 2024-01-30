import { Alert, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import { RHFCheckbox } from 'src/components/common/hook-form';
import BillingDetails from '../common/billing-details';
import PaymentCard from '../common/payment-card';
import PurchaseFormDetails from './purchase-form-details';

export const Props = {
  wrapperElement: PropTypes.elementType,
  actions: PropTypes.node,
  openBillingDialog: PropTypes.func,
  openCardDialog: PropTypes.func,
  purchaseData: PropTypes.objectOf({
    warehouse: PropTypes.object,
    pallet: PropTypes.number,
    price: PropTypes.number,
    total: PropTypes.number,
    month: PropTypes.number,
  }),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseFormFields = (props) => {
  const {
    wrapperElement,
    actions,
    openBillingDialog = () => {},
    openCardDialog = () => {},
    purchaseData,
  } = props;

  const methods = useFormContext();
  const { watch } = methods;

  const billingDetails = watch('billing_details', undefined);
  const card = watch('card', undefined);

  return (
    <>
      <Stack component={wrapperElement} sx={{ py: 1 }} spacing={2}>
        <PurchaseFormDetails {...purchaseData} />
        <BillingDetails billingDetails={billingDetails} onClick={openBillingDialog} />
        <PaymentCard card={card} onClick={openCardDialog} />
        <Alert severity="info" variant="outlined" sx={{ typography: 'body2' }}>
          By clicking confirm payment, you are authorizing a hold on your payment method for the
          total amount specified. Your purchase is pending approval by the warehouse. If approved
          your payment method will be charged. If denied, the hold will be removed.
        </Alert>
        <RHFCheckbox label="Agree to terms of privacy & policy" />
      </Stack>

      {actions}
    </>
  );
};

PurchaseFormFields.propTypes = Props;

export default PurchaseFormFields;
