'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// local components
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useSettingsContext } from 'src/components/common/settings';
import { paths } from 'src/routes/paths';
import WarehouseEditFields from './warehouse-edit-fields';

const WarehouseProps = {
  /**
   * @type {Warehouse}
   */
  warehouse: PropTypes.object.isRequired,
};

const WarehouseEditSchema = Yup.object().shape({
  name: Yup.string().required('Warehouse name is required'),
  address: Yup.object().shape({
    streetNumber: Yup.string().required('Warehouse street number is required'),
    streetAddress: Yup.string().required('Warehouse street address is required'),
    city: Yup.string().required('Warehouse city is required'),
    state: Yup.string().required('Warehouse state is required'),
    zipCode: Yup.string().required('Warehouse zip code is required'),
    country: Yup.string().required('Warehouse country is required'),
  }),
  totalSpace: Yup.number()
    .min(1, 'Must be greater than or equal 1')
    .required('Total space is required'),
  pricePerSquare: Yup.number()
    .min(1, 'Must be greater than or equal 1')
    .required('Price per square is required'),
  description: Yup.string().required('Description is required'),
  photos: Yup.array(
    Yup.object().shape({
      title: Yup.string().required('Photo title is required'),
      coverUrl: Yup.string().required('Photo url is required'),
    })
  ),
});

/**
 * @param {WarehouseProps} param0
 * @returns {JSX.Element}
 */
const WarehouseEdit = ({ warehouse }) => {
  const settings = useSettingsContext();
  const methods = useForm({ defaultValues: warehouse, resolver: yupResolver(WarehouseEditSchema) });
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values) => {
    console.log('Warehouse Update: ', values);
    enqueueSnackbar('Warehouse updated', { variant: 'success' });
  };

  useEffect(() => {
    if (warehouse) {
      reset(warehouse);
    }
  }, [warehouse, reset]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Edit Warehouse"
        links={[
          { name: 'warehouse', href: paths.dashboard.listing },
          { name: warehouse?.id, href: `${paths.warehouse.root}/${warehouse?.id}` },
          { name: 'edit' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WarehouseEditFields />
      </FormProvider>
    </Container>
  );
};

WarehouseEdit.propTypes = WarehouseProps;

export default WarehouseEdit;
