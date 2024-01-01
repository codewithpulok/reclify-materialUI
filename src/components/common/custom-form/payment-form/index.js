/* eslint-disable import/no-cycle */
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { getPaymentCardsByUserId } from 'src/assets/dummy';
import { getBillingAddressByUserId } from 'src/assets/dummy/billing-address';
import { useAuthContext } from 'src/auth/hooks';
import {
  BillingAddressListDialog,
  PaymentCardListDialog,
} from 'src/components/user-settings/dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider from '../../hook-form/form-provider';
import BillingDetails from './billing-details';
import PaymentCard from './payment-card';

const PaymentFormProps = {
  wrapperElement: PropTypes.elementType,
  actions: PropTypes.node,
  submitCallback: PropTypes.func,
};

const defaultValues = {
  billing_details: undefined,
  card: undefined,
};

/**
 * @param {PaymentFormProps} props
 * @returns {JSX.Element}
 */
const PaymentForm = (props) => {
  const { wrapperElement, actions, submitCallback = () => {} } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const userBillingAddress = getBillingAddressByUserId(user?.id);
  const primaryBillingAddress = userBillingAddress.find((a) => a.primary);
  const userPaymentCards = getPaymentCardsByUserId(user?.id);
  const primaryPaymentCard = userPaymentCards.find((p) => p.primary);

  const methods = useForm({ defaultValues });
  const { handleSubmit, setValue, watch, reset } = methods;

  const billingDetails = watch('billing_details');
  const card = watch('card');

  const cardsDialog = useBoolean();
  const billingDetailsDialog = useBoolean();

  const onSubmit = async (values) => {
    console.log('Payment: ', values);
    enqueueSnackbar('Payment Complete');
    submitCallback();
  };

  const onAddressChange = (newAddress) => {
    setValue('billing_details', newAddress);
  };

  const onCardChange = (newCard) => {
    setValue('card', newCard);
  };

  useEffect(() => {
    const changes = defaultValues;
    if (primaryBillingAddress) changes.billing_details = primaryBillingAddress;
    if (primaryPaymentCard) changes.card = primaryPaymentCard;
    reset(changes);
  }, [primaryBillingAddress, primaryPaymentCard, reset]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box component={wrapperElement} sx={{ py: 1 }}>
          <BillingDetails
            billingDetails={billingDetails}
            onClick={billingDetailsDialog.onTrue}
            sx={{ mb: 2 }}
          />
          <PaymentCard card={card} onClick={cardsDialog.onTrue} />
        </Box>

        {actions}
      </FormProvider>

      <BillingAddressListDialog
        list={userBillingAddress}
        onClose={billingDetailsDialog.onFalse}
        open={billingDetailsDialog.value}
        selected={(id) => primaryBillingAddress?.id === id}
        onSelect={onAddressChange}
      />

      <PaymentCardListDialog
        list={userPaymentCards}
        onClose={cardsDialog.onFalse}
        open={cardsDialog.value}
        selected={(id) => primaryPaymentCard?.id === id}
        onSelect={onCardChange}
      />
    </>
  );
};

PaymentForm.propTypes = PaymentFormProps;

export default PaymentForm;
