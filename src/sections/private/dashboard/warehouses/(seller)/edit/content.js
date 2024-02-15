'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// local components
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useSettingsContext } from 'src/components/common/settings';
import { useWarehouseUpdateMutation } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import WarehouseFields, { stepFields } from '../common/warehouse-fields';
import warehouseSchema from '../common/warehouse-schema';
import EditStepper from './stepper';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Content = (props) => {
  const { warehouse } = props;
  const router = useRouter();
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  // app states
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = useCallback(() => {
    if (activeStep === 2) return;

    setActiveStep((prev) => prev + 1);
  }, [activeStep]);

  const handleBack = () => {
    if (activeStep === 0) return;

    setActiveStep((prev) => prev - 1);
  };

  const [updateWarehouse] = useWarehouseUpdateMutation();

  const methods = useForm({ defaultValues: warehouse, resolver: yupResolver(warehouseSchema) });
  const { handleSubmit, reset, formState, trigger } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset({});
    router.back();
  }, [reset, router]);

  // handle submit form request
  const onSubmit = useCallback(
    async (values) => {
      // updateing total space
      values.totalSpace = Math.round(values.totalSpace);

      console.log('Warehouse Update: ', values);

      const response = await updateWarehouse({ data: values, id: warehouse?.id });
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(data?.message || 'Error in warehouse update', { variant: 'error' });
        console.error('Error Warehouse Update: ', error || data?.message);
      } else if (!error && data?.success) {
        enqueueSnackbar('Warehouse updated!');
        reset({});
        router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
      }
    },
    [enqueueSnackbar, reset, router, updateWarehouse, warehouse?.id]
  );

  // validate steps before going to next step
  const validateStep = useCallback(async () => {
    const fields = stepFields[activeStep];
    if (!fields) return;

    const response = await trigger(fields, { shouldFocus: true });

    if (!response) return;

    handleNext();
  }, [activeStep, handleNext, trigger]);

  // mannualy submit form
  const submitForm = async () => {
    // Trigger validations before submitting
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  // scroll to top after step change
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [activeStep]);

  // update form on warehous changes
  useEffect(() => {
    if (warehouse) {
      reset(warehouse);
    }
  }, [warehouse, reset]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Edit Warehouse"
        links={[{ name: 'warehouses', href: paths.dashboard.warehouses.root }, { name: 'edit' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <Stack>
          <EditStepper activeStep={activeStep} handleBack={handleBack} handleNext={validateStep} />
          <WarehouseFields activeStep={activeStep} />
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
            spacing={1}
            mt={5}
          >
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              size="large"
              type="button"
              onClick={activeStep === 2 ? submitForm : validateStep}
              color="primary"
            >
              {activeStep === 2 ? 'Save Changes' : 'Next'}
            </LoadingButton>

            <Button
              variant="soft"
              size="large"
              color="error"
              onClick={activeStep === 0 ? onReset : handleBack}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
};

Content.propTypes = Props;

export default Content;
