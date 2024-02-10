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
import { useSettingsContext } from 'src/components/common/settings';
import { useWarehouseCreateMutation } from 'src/redux-toolkit/services/warehouseApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { getPredefinedFieldsDefaultValue } from 'src/utils/predefined-fields';
import WarehouseFields from '../common/warehouse-fields';
import warehouseSchema from '../common/warehouse-schema';

const Props = {
  /** @type {Warehouse | undefined} */
  sourceWarehouse: PropTypes.object,
};

/** @type {Warehouse} */
const defaultValues = {
  name: '',
  address: '',
  totalSpace: null,
  pricePerSpace: null,
  discountRate: null,
  maxSpaceOrder: null,
  minSpaceOrder: null,
  description: '',
  photos: [],
  features: getPredefinedFieldsDefaultValue(predefinedFeatures),
  facilityDetails: getPredefinedFieldsDefaultValue(predefinedFacility),
  services: getPredefinedFieldsDefaultValue(predefinedServices),
  amenities: getPredefinedFieldsDefaultValue(predefinedAmenities),
  regionScope: '',
  region: '',
  documents: [],
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Content = (props) => {
  const { sourceWarehouse } = props;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();

  const [createWarehouse] = useWarehouseCreateMutation();

  const methods = useForm({
    resolver: yupResolver(warehouseSchema),
    defaultValues: sourceWarehouse || defaultValues,
  });
  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting } = formState;

  // reset form
  const onReset = useCallback(() => {
    reset(defaultValues);
    router.back();
  }, [reset, router]);

  // handle form submit
  const onSubmit = useCallback(
    async (values) => {
      // updateing total space
      values.totalSpace = Math.round(values.totalSpace);

      console.log('Warehouse Create: ', values);
      const response = await createWarehouse(values);
      const { data, error } = response;

      if (error || data?.isError) {
        enqueueSnackbar(data?.message || 'Error in warehouse create', { variant: 'error' });
      } else if (!error || data?.success) {
        enqueueSnackbar('Warehouse created!');
        reset(defaultValues);
        router.push(`${paths.dashboard.warehouses.root}/${data?.results?.id}`);
      }
    },
    [createWarehouse, enqueueSnackbar, reset, router]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Warehouse"
        links={[
          { name: 'warehouses', href: paths.dashboard.warehouses.root },
          { name: 'create', href: '#' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <Stack spacing={1.5}>
          <WarehouseFields />
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
              type="submit"
              color="primary"
            >
              Create Warehouse
            </LoadingButton>

            <Button
              LinkComponent={RouterLink}
              variant="soft"
              size="large"
              color="error"
              type="reset"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
};

Content.propTypes = Props;

export default Content;
