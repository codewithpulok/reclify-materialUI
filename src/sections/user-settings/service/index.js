'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
// local components
import { LoadingButton } from '@mui/lab';
import { useCallback } from 'react';

import { getServiceById } from 'src/assets/dummy/services';
import FormProvider from 'src/components/common/hook-form/form-provider';
import CreateFields from './services-fields';
import createSchema from './services-schema';

const Props = {};

/** @type {Warehouse} */
const defaultValues = {
  type: '',
  features: {},
  photos: [],
  description: '',
  keyFeatures: [],
  clientList: '',
  businessSize: 0,
  foundedYear: 1800,
  cta: '',
  promoCode: '',
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SettingsService = (props) => {
  const service = getServiceById();
  const methods = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: service,
  });
  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
  }, [reset]);

  // handle form submit
  const onSubmit = useCallback(async (values) => {
    console.log('Update Service:', values);
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="end" mb={5}>
        <Button
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          color="primary"
          variant="contained"
          fullWidth
        >
          Preview
        </Button>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <Stack spacing={1.5}>
          <CreateFields />
          <Stack
            sx={{
              flexDirection: {
                xs: 'row',
                sm: 'row-reverse',
              },
              justifyContent: {
                xs: 'start',
                sm: 'end',
              },
            }}
            flexWrap="wrap"
            spacing={0.5}
            mt={5}
          >
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              size="large"
              type="submit"
              color="primary"
            >
              Update Service
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
};

SettingsService.propTypes = Props;

export default SettingsService;
