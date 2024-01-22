import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
// local components
import { ArrayField, PredefinedFields } from 'src/components/common/custom-fields';
import { RHFDatePicker, RHFTextField } from 'src/components/common/hook-form';
import Label from 'src/components/common/label';
import { WarehousePhotoUpload } from 'src/components/warehouse/upload';
import { serviceTypes } from 'src/constant/service-types';
import { paramCase } from 'src/utils/change-case';

const ServiceFields = (props) => {
  /** @type {PredefinedField[]} */
  const subServices = useMemo(
    () =>
      serviceTypes[2].subtypes.map((t) => ({
        key: paramCase(t),
        label: t,
        fieldType: 'switch',
        dataType: 'boolean',
      })),
    []
  );

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFTextField name="name" label="Client list" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="businessSize"
              label="Business Size"
              type="number"
              onChangeMiddleware={(v) => (v !== '' && Number(v) < 0 ? 0 : v)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <RHFDatePicker
              name="foundedYear"
              label="Founded Year"
              views={['year']}
              slotProps={{ textField: { fullWidth: true } }}
              minDate={new Date().setFullYear(1800, 0, 0)}
              maxDate={new Date()}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name="cta" label="What do you want to achieve?" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name="promoCode" label="Promo Code" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name="description" label="Description" rows={4} multiline fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Label sx={{ mb: 1 }}>Photos</Label>
            <WarehousePhotoUpload name="photos" />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <PredefinedFields
              name="services"
              fields={subServices}
              label="Services"
              defaultExpanded
            />
          </Grid>

          <Grid item xs={12}>
            <ArrayField name="keyFeatures" label="Key Features" defaultExpanded />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ServiceFields.propTypes = {};

export default ServiceFields;
