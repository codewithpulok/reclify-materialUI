'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// local components
import {
  approvedUsesDefaultValues,
  facilityDefaultValues,
  featuresDefaultValues,
  servicesDefaultValues,
} from 'src/assets/data';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useSettingsContext } from 'src/components/common/settings';
import useSnackbarPromise from 'src/components/common/snackbar/snackbar-promise';
import { useCreateWarehouseMutation } from 'src/lib/services/warehouseApi';
import { paths } from 'src/routes/paths';
import CreateFields from './create-fields';
import createSchema from './create-schema';

const WarehouseCreateViewProps = {
  /** @type {Warehouse | undefined} */
  sourceWarehouse: PropTypes.object,
};

const defaultValues = {
  name: '',
  address: '',
  totalSpace: 0,
  pricePerSquare: 0,
  description: '',
  photos: [],
  approvedUses: approvedUsesDefaultValues,
  features: featuresDefaultValues,
  facilityDetails: facilityDefaultValues,
  services: servicesDefaultValues,
  rules: [],
};

/**
 * @param {WarehouseCreateViewProps} props
 * @returns {JSX.Element}
 */
const WarehouseCreateView = (props) => {
  const { sourceWarehouse } = props;

  const [createWarehouse] = useCreateWarehouseMutation();

  const { snackbarPromise } = useSnackbarPromise();
  const settings = useSettingsContext();

  const methods = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: sourceWarehouse || defaultValues,
  });
  const { handleSubmit } = methods;

  // handle form submit
  const onSubmit = async (values) => {
    console.log('Warehouse Create: ', values);

    await snackbarPromise(createWarehouse(values));
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Warehouse"
        links={[{ name: 'warehouses', href: paths.dashboard.listing }, { name: 'create' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <CreateFields />
      </FormProvider>
    </Container>
  );
};

WarehouseCreateView.propTypes = WarehouseCreateViewProps;

export default WarehouseCreateView;
