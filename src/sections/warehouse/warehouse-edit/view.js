'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import * as Yup from 'yup';
import WarehouseEditFields from './warehouse-edit-fields';

const WarehouseProps = {
  /**
   * @type {Warehouse}
   */
  warehouse: PropTypes.object.isRequired,
};

const WarehouseEditSchema = Yup.object().shape({
  name: Yup.string().required('Warehouse name is required'),
  location: Yup.string().required('Address is required'),
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

  const onSubmit = (e) => {
    console.log(e);
    enqueueSnackbar('Warehouse updated', { variant: 'success' });
  };

  useEffect(() => {
    if (warehouse) {
      reset(warehouse);
    }
  }, [warehouse, reset]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack direction="row" alignItems="baseline" mb={5}>
        <Typography variant="h4" mr={2}>
          Edit Warehouse
        </Typography>
        <Typography variant="h6" color="GrayText">
          #{warehouse?.id}
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WarehouseEditFields />
      </FormProvider>
    </Container>
  );
};

WarehouseEdit.propTypes = WarehouseProps;

export default WarehouseEdit;
