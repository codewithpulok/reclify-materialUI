import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../../config-custom-form';
import Fields from './fields';
import { billingAddressEditSchema } from './schema';

const Props = {
  ...CustomFormProps,
  billingAddress: PropTypes.object.isRequired,
};

/** @type {BillingAddress} */
const defaultValues = {
  address: { city: '', country: '', state: '', street1: '', street2: '', zipCode: '' },
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
const BillingDetailsEditForm = (props) => {
  const {
    actions,
    failedCallback = () => {},
    successCallback = () => {},
    wrapperElement,
    sx = {},
    billingAddress,
  } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(billingAddressEditSchema) });
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle edit billing address
  const onSubmit = useCallback(
    (values) => {
      try {
        enqueueSnackbar('Billing address edited!');
        console.log('Billing address edited: ', values);
        successCallback(values, false, onReset);
      } catch (error) {
        enqueueSnackbar('Error in editing billing address!', { variant: 'error' });
        console.error('Billing address edit error: ', error);
        failedCallback(values, error, onReset);
      }
    },
    [enqueueSnackbar, failedCallback, onReset, successCallback]
  );

  // update default values
  useEffect(() => {
    if (billingAddress) {
      reset(billingAddress);
    } else {
      reset(defaultValues);
    }
  }, [billingAddress, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <Fields />
      </Box>

      {actions}
    </FormProvider>
  );
};

BillingDetailsEditForm.propTypes = Props;

export default BillingDetailsEditForm;
