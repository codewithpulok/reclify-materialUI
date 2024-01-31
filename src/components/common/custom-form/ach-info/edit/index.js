import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../../config-custom-form';
import Fields from './fields';
import { ACHInfoEditSchema } from './schema';

const Props = {
  ...CustomFormProps,
  /** @type {ACHType} */
  ach: PropTypes.object,
};

/** @type {ACHType} */
const defaultValues = {
  accountName: '',
  accountNumber: null,
  routingNumber: null,
  primary: false,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoEditForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {}, ach } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(ACHInfoEditSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [reset]
  );

  // handle edit payment card
  const onSubmit = (values) => submitCallback(values, onReset);

  // update default values
  useEffect(() => {
    if (ach) {
      reset(ach);
    } else {
      reset(defaultValues);
    }
  }, [ach, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <Fields />
      </Box>

      {actions}
    </FormProvider>
  );
};

ACHInfoEditForm.propTypes = Props;

export default ACHInfoEditForm;
