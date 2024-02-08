import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import BillingFields from './common/billing-fields';
import { billingSchema } from './common/billing-schema';

const Props = {
  ...CustomFormProps,
};

/** @type {BillingAddress} */
const defaultValues = {
  address: { city: '', country: '', state: '', street1: '', street2: '', zipCode: '' },
  fullName: '',
  email: '',
  phoneNumber: '',
  isPrimary: false,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingInfoCreateForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {} } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(billingSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle create billing address
  const onSubmit = (values) => submitCallback(values, onReset);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <BillingFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

BillingInfoCreateForm.propTypes = Props;

export default BillingInfoCreateForm;
