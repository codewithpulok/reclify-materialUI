import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import { useBoolean } from 'src/hooks/use-boolean';
import { BillingAddressListDialog, PaymentCardListDialog } from '../../custom-dialog';
import BillingDetails from './billing-details';
import PaymentCard from './payment-card';

export const Props = {
  wrapperElement: PropTypes.elementType,
  actions: PropTypes.node,
  children: PropTypes.node,
  billingAddresses: PropTypes.arrayOf(PropTypes.object),
  paymentCards: PropTypes.arrayOf(PropTypes.object),
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
    billingAddresses = [],
    paymentCards = [],
  } = props;

  const methods = useFormContext();
  const { setValue, watch } = methods;

  const billingDetails = watch('billing_details');
  const card = watch('card');

  const cardsDialog = useBoolean();
  const billingDetailsDialog = useBoolean();

  const onAddressChange = (newAddress) => {
    setValue('billing_details', newAddress);
  };
  const onCardChange = (newCard) => {
    setValue('card', newCard);
  };

  return (
    <>
      <Stack component={wrapperElement} sx={{ py: 1 }} spacing={2}>
        <BillingDetails billingDetails={billingDetails} onClick={billingDetailsDialog.onTrue} />
        <PaymentCard card={card} onClick={cardsDialog.onTrue} />
        {children}
      </Stack>

      {actions}

      <BillingAddressListDialog
        list={billingAddresses}
        onClose={billingDetailsDialog.onFalse}
        open={billingDetailsDialog.value}
        selected={(id) => billingDetails?.id === id}
        onSelect={onAddressChange}
      />

      <PaymentCardListDialog
        list={paymentCards}
        onClose={cardsDialog.onFalse}
        open={cardsDialog.value}
        selected={(id) => card?.id === id}
        onSelect={onCardChange}
      />
    </>
  );
};

PaymentFields.propTypes = Props;

export default PaymentFields;
