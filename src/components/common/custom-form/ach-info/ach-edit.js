import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from 'src/components/common/hook-form/form-provider';
import { CustomFormProps } from '../config-custom-form';
import AchEditFields from './common/ach-edit-fields';
import { AchEditSchema } from './common/ach-schema';

const Props = {
  ...CustomFormProps,
  /** @type {ACHType} */
  ach: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoEditForm = (props) => {
  const { actions, submitCallback = () => {}, wrapperElement, sx = {}, ach } = props;

  /** @type {ACHType} */
  const defaultValues = useMemo(
    () => ({
      accountName: ach?.accountName || '',
      accountHolderType: ach?.accountHolderType || 'individual',
      isPrimary: ach?.isPrimary || false,
    }),
    [ach?.accountHolderType, ach?.accountName, ach?.isPrimary]
  );

  const methods = useForm({ defaultValues, resolver: yupResolver(AchEditSchema) });
  const { handleSubmit, reset } = methods;

  // handle form reset
  const onReset = useCallback(
    (values = defaultValues) => {
      reset(values);
    },
    [defaultValues, reset]
  );

  // handle edit payment card
  const onSubmit = (values) => submitCallback(values, onReset);

  // update default values
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Box component={wrapperElement} sx={sx}>
        <AchEditFields />
      </Box>

      {actions}
    </FormProvider>
  );
};

ACHInfoEditForm.propTypes = Props;

export default ACHInfoEditForm;
