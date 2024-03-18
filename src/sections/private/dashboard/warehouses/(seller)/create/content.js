'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// local components
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import {
  predefinedAmenities,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
} from 'src/assets/data/predefined-fields/warehouse';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { WarehouseDetailsPreview } from 'src/components/warehouse/details';
import { useBoolean } from 'src/hooks/use-boolean';
import useStepper from 'src/hooks/use-stepper';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { useWarehouseCreateMutation } from 'src/redux-toolkit/services/warehouseApi';
import { paths } from 'src/routes/paths';
import { getPredefinedFieldsDefaultValue } from 'src/utils/predefined-fields';
import WarehouseFields, { stepFields } from '../common/warehouse-fields';
import warehouseSchema from '../common/warehouse-schema';
import WarehouseStepper from '../common/warehouse-stepper';

// ----------------------------------------------------------------------
const Props = {
  /** @type {Warehouse | undefined} */
  sourceWarehouse: PropTypes.object,
};

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
  features: getPredefinedFieldsDefaultValue(predefinedFeatures),
  facilityDetails: getPredefinedFieldsDefaultValue(predefinedFacility),
  services: getPredefinedFieldsDefaultValue(predefinedServices),
  amenities: getPredefinedFieldsDefaultValue(predefinedAmenities),
  regionScope: '',
  region: '',
  documents: [],
  discount1: undefined,
  discount3: undefined,
  discount6: undefined,
  discount12: undefined,
  hasPromo: false,
  price1: undefined,
  price12: undefined,
  price3: undefined,
  price6: undefined,
  promoCode: '',
  discountAll: undefined,
  hotRackEnabled: false,
  discountOption: 'percentage',
  logo: null,
  banner: null,
  miniLogo: null,
  highlights: '',
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Content = (props) => {
  const { sourceWarehouse } = props;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const appearance = useAppearance();

  // app states
  const { activeStep, goBack, goNext } = useStepper(0, 2);
  const isPreview = useBoolean();

  // api state
  const [createWarehouse] = useWarehouseCreateMutation();

  // form state
  const methods = useForm({
    resolver: yupResolver(warehouseSchema),
    defaultValues: sourceWarehouse || defaultValues,
  });
  const { handleSubmit, formState, reset, trigger, watch } = methods;
  const { isSubmitting } = formState;
  const values = watch();

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
    router.back();
  }, [reset, router]);

  // handle form submit
  const handleCreate = useCallback(
    async (formValues) => {
      // updateing total space
      formValues.totalSpace = Math.round(formValues.totalSpace);

      console.log('Warehouse Create: ', formValues);
      const response = await createWarehouse(formValues);
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(error?.data?.message || data?.message || 'Error in warehouse create', {
          variant: 'error',
        });
      } else if (!error || data?.success) {
        enqueueSnackbar('Warehouse created!');
        reset(defaultValues);
        router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
      }
    },
    [createWarehouse, enqueueSnackbar, reset, router]
  );

  // validate steps before going to next step
  const validateStep = useCallback(async () => {
    const fields = stepFields[activeStep];
    if (!fields) return;

    const response = await trigger(fields, { shouldFocus: true });

    if (!response) return;

    goNext();
  }, [activeStep, goNext, trigger]);

  // mannualy submit form
  const submitForm = async () => {
    // Trigger validations before submitting
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(handleCreate)();
    }
  };

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Warehouse"
        links={[
          { name: 'warehouses', href: paths.dashboard.warehouses.root },
          { name: 'create', href: '#' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button variant="soft" color="primary" onClick={isPreview.onToggle}>
            {isPreview.value ? 'Create Mode' : 'Preview Mode'}
          </Button>
        }
      />

      {!isPreview.value && (
        <FormProvider methods={methods} onSubmit={handleSubmit(handleCreate)} onReset={onReset}>
          <Stack spacing={1.5}>
            <WarehouseStepper
              activeStep={activeStep}
              handleBack={goBack}
              handleNext={validateStep}
            />

            <WarehouseFields
              activeStep={activeStep}
              excludeImages={sourceWarehouse?.photos?.map((p) => p.link) || []}
            />
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
                {activeStep === 2 ? 'Create' : 'Next'}
              </LoadingButton>

              <Button
                variant="soft"
                size="large"
                color="error"
                onClick={activeStep === 0 ? onReset : goBack}
              >
                {activeStep === 0 ? 'Cancel' : 'Back'}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      )}

      {isPreview.value && (
        <WarehouseDetailsPreview warehouse={values || {}} reviews={values?.reviews || []} />
      )}
    </Container>
  );
};

Content.propTypes = Props;

export default Content;
