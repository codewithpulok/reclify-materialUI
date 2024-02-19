import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useStripe } from '@stripe/react-stripe-js';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import AchFields from './common/ach-fields';
import { AchSchema } from './common/ach-schema';

const Props = {
  ...CustomFormProps,
};

/** @type {ACHType} */
const defaultValues = {
  accountName: '',
  accountNumber: '',
  routingNumber: '',
  isPrimary: false,
  accountHolderType: 'company',
  email: '',
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoCreateForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {} } = props;

  const stripe = useStripe();

  const methods = useForm({ defaultValues, resolver: yupResolver(AchSchema) });
  const { handleSubmit, reset, clearErrors, setError } = methods;

  // generate token from stripe
  const getToken = async (data) => {
    clearErrors(); // reset errors
    if (!stripe) return null;

    const { error, token } = await stripe.createToken('bank_account', {
      account_number: data.accountNumber,
      routing_number: data.routingNumber,
      account_holder_name: data.accountName,
      country: 'US',
      currency: 'usd',
      account_holder_type: data.accountHolderType,
    });

    if (error) {
      console.error('ERROR: Create Token ->', error);
      setError('root', { message: error?.message || 'Error in creating ach' });
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

  // handle create ach
  const onSubmit = async (values) => {
    const token = await getToken(values);
    if (!token) return null; // if token generation error then stop execution
    return submitCallback({ achToken: token.id, ...values }, onReset);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <AchFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

ACHInfoCreateForm.propTypes = Props;

export default ACHInfoCreateForm;
