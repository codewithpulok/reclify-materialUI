'use client';

import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import UploadPhotos from './UploadPhotos';

const warehouseProps = {
  /**
   * @type {Warehouse}
   */
  warehouse: PropTypes.object.isRequired,
};

const WarehouseEdit = ({ warehouse }) => {
  const settings = useSettingsContext();
  const methods = useForm({ defaultValues: warehouse });
  const { handleSubmit, reset } = methods;

  const onSubmit = (e) => {
    console.log(e);
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
        <Grid container maxWidth={600} spacing={1.2}>
          <Grid item xs={12}>
            <RHFTextField
              name="name"
              label="Name"
              variant="outlined"
              InputProps={{ sx: {} }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="location"
              label="Address"
              variant="outlined"
              InputProps={{ sx: {} }}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField
              name="totalSpace"
              label="Space"
              variant="outlined"
              InputProps={{ sx: {} }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name="pricePerSquare"
              label="Price Per Sqare"
              variant="outlined"
              InputProps={{ sx: {} }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              name="description"
              label="Description"
              variant="outlined"
              InputProps={{ sx: {} }}
              rows={4}
              multiline
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <UploadPhotos />
          </Grid>

          <Grid item xs={12} textAlign="right" mt={5}>
            <Button variant="contained" size="large" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
};

WarehouseEdit.propTypes = warehouseProps;

export default WarehouseEdit;
