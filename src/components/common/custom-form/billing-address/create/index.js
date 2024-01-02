import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../../config-custom-form';
import Fields from './fields';
import { billingAddressCreateSchema } from './schema';

const Props = {
  ...CustomFormProps,
};

/** @type {BillingAddress} */
const defaultValues = {
  address: { city: '', country: '', state: '', streetAddress: '', streetNumber: '', zipCode: '' },
  addressType: 'office',
  fullName: '',
  email: '',
  phoneNumber: '',
  primary: false,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingDetailsCreateForm = (props) => {
  const {
    actions,
    failedCallback = () => {},
    successCallback = () => {},
    wrapperElement,
    sx = {},
  } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(billingAddressCreateSchema) });
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle create billing address
  const onSubmit = useCallback(
    (values) => {
      try {
        enqueueSnackbar('Billing address added!');
        console.log('Billing address added: ', values);
        successCallback(values, false, onReset);
      } catch (error) {
        enqueueSnackbar('Error in adding billing address!', { variant: 'error' });
        console.error('Billing address create error: ', error);
        failedCallback(values, error, onReset);
      }
    },
    [enqueueSnackbar, failedCallback, onReset, successCallback]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <Fields />
      </Box>

      {actions}
    </FormProvider>
  );
};

BillingDetailsCreateForm.propTypes = Props;

export default BillingDetailsCreateForm;
