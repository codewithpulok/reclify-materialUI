import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useElements, useStripe } from '@stripe/react-stripe-js';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import CardFields from './common/card-fields';
import { cardSchema } from './common/card-schema';

const Props = {
  ...CustomFormProps,
};

/** @type {PaymentCard} */
const defaultValues = {
  name: '',
  isPrimary: false,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PaymentCardCreateForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {} } = props;

  const stripe = useStripe();
  const elements = useElements();

  const methods = useForm({ defaultValues, resolver: yupResolver(cardSchema) });
  const { handleSubmit, reset, setError, clearErrors, formState } = methods;
  const { errors } = formState;

  // generate token from stripe
  const getToken = async (name) => {
    clearErrors(); // reset errors
    if (!stripe || !elements) return null;

    const { error, token } = await stripe.createToken(elements.getElement('card'), { name });

    if (error) {
      console.error('ERROR: Create Token ->', error);
      setError('root', { message: error?.message || 'Error in creating card' });
      return null;
    }

    return token;
  };

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle create payment card
  const onSubmit = async (values) => {
    const token = await getToken(values?.name);
    if (!token) return null; // if token generation error then stop execution
    return submitCallback({ token, values }, onReset);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        {errors?.root?.message && <Alert severity="error">{errors?.root?.message}</Alert>}

        <CardFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

PaymentCardCreateForm.propTypes = Props;

export default PaymentCardCreateForm;
