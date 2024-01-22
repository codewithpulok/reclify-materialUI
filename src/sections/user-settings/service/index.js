'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
// local components
import { LoadingButton } from '@mui/lab';
import { useCallback } from 'react';
import {
  predefinedApprovedUses,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
} from 'src/assets/data';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { getPredefinedFieldsDefaultValue } from 'src/utils/predefined-fields';
import CreateFields from './services-fields';
import createSchema from './services-schema';

const Props = {};

/** @type {Warehouse} */
const defaultValues = {
  name: '',
  address: '',
  totalSpace: undefined,
  pricePerSpace: undefined,
  discountRate: undefined,
  maxSpaceOrder: undefined,
  minSpaceOrder: undefined,
  description: '',
  photos: [],
  approvedUses: getPredefinedFieldsDefaultValue(predefinedApprovedUses),
  features: getPredefinedFieldsDefaultValue(predefinedFeatures),
  facilityDetails: getPredefinedFieldsDefaultValue(predefinedFacility),
  services: getPredefinedFieldsDefaultValue(predefinedServices),
  rules: [],
  region: 'northeast',
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SettingsService = (props) => {
  const methods = useForm({
    resolver: yupResolver(createSchema),
    defaultValues,
  });
  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
  }, [reset]);

  // handle form submit
  const onSubmit = useCallback(async (values) => {
    // updateing total space
    // values.totalSpace = Math.round(values.totalSpace);
    // console.log('Warehouse Create: ', values);
    // const response = await createWarehouse(values);
    // const { data, error } = response;
    // if (error || data?.isError) {
    //   enqueueSnackbar(data?.message || 'Error in warehouse create', { variant: 'error' });
    // } else if (!error || data?.isSuccess) {
    //   enqueueSnackbar('Warehouse created!');
    //   reset(defaultValues);
    //   router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
    // }
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
