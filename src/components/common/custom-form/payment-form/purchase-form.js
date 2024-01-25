import { Alert } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getPaymentCardsByUserId } from 'src/assets/dummy';
import { getBillingAddressByUserId } from 'src/assets/dummy/billing-address';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useCreatePurchaseMutation } from 'src/redux-toolkit/services/purchaseApi';
import FormProvider from '../../hook-form/form-provider';
import PaymentFields, { Props as FieldProps } from './payment-fields';

export const Props = {
  submitCallback: PropTypes.func,
  purchaseData: {
    warehouse: PropTypes.object.isRequired,
    pallet: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  },
  ...FieldProps,
};

const defaultValues = {
  billing_details: undefined,
  card: undefined,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseForm = (props) => {
  const { submitCallback, purchaseData, ...other } = props;
  const [createPurchase] = useCreatePurchaseMutation();

  const { user } = useAppSelector(selectAuth);

  const userBillingAddress = getBillingAddressByUserId('2') || getBillingAddressByUserId(user?.id);
  const primaryBillingAddress = userBillingAddress.find((a) => a.primary);
  const userPaymentCards = getPaymentCardsByUserId('2') || getPaymentCardsByUserId(user?.id);
  const primaryPaymentCard = userPaymentCards.find((p) => p.primary);

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values) => {
    const newValues = {
      warehouseId: purchaseData?.warehouse?.id,
      pallet: purchaseData?.pallet,
      price: purchaseData?.price,
      total: purchaseData?.total,
      month: purchaseData?.month,
      billingInfoId: values?.billing_details?.id,
      cardId: values?.card?.id,
    };

    console.log('Purchase Create: ', newValues);
    const response = await createPurchase(newValues);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in create purchase', { variant: 'error' });
      console.error('Error in create purchase', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Purchase Created!');
      console.warn('Purchase Created!', response);
      submitCallback();
    }
  };

  useEffect(() => {
    const changes = { ...defaultValues };
    if (primaryBillingAddress) changes.billing_details = primaryBillingAddress;
    if (primaryPaymentCard) changes.card = primaryPaymentCard;

    reset(changes);
  }, [primaryBillingAddress, primaryPaymentCard, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PaymentFields
        {...other}
        billingAddresses={userBillingAddress}
        paymentCards={userPaymentCards}
      >
        <Alert severity="info" variant="outlined" sx={{ typography: 'body2' }}>
          By clicking confirm payment, you are authorizing a hold on your payment method for the
          total amount specified. Your purchase is pending approval by the warehouse. If approved
          your payment method will be charged. If denied, the hold will be removed.
        </Alert>
      </PaymentFields>
    </FormProvider>
  );
};

PurchaseForm.propTypes = Props;

export default PurchaseForm;
