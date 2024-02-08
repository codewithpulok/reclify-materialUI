import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import BillingFields from './common/billing-fields';
import { billingSchema } from './common/billing-schema';

const Props = {
  ...CustomFormProps,
  /** @type {BillingAddress} */
  billingAddress: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingInfoEditForm = (props) => {
  const { submitCallback = () => {}, actions, wrapperElement, sx = {}, billingAddress } = props;

  /** @type {BillingAddress} */
  const defaultValues = useMemo(
    () => ({
      address: billingAddress?.address || {},
      fullName: billingAddress?.fullName || '',
      email: billingAddress?.email || '',
      phoneNumber: billingAddress?.phoneNumber || '',
      isPrimary: billingAddress?.isPrimary || false,
    }),
    [
      billingAddress?.address,
      billingAddress?.email,
      billingAddress?.fullName,
      billingAddress?.isPrimary,
      billingAddress?.phoneNumber,
    ]
  );

  const methods = useForm({ defaultValues, resolver: yupResolver(billingSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [defaultValues, reset]
  );

  // handle edit billing address
  const onSubmit = (values) => submitCallback(values, onReset);

  // update default values
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <BillingFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

BillingInfoEditForm.propTypes = Props;

export default BillingInfoEditForm;
