import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { predefinedServiceFeatures } from 'src/assets/data/predefined-fields/service';
// local components
import {
  ArrayField,
  PhotosUploadField,
  PredefinedFields,
} from 'src/components/common/custom-fields';
import { RHFDatePicker, RHFTextField } from 'src/components/common/hook-form';
import Label from 'src/components/common/label';

const ServiceFields = (props) => {
  const { watch, setValue } = useFormContext();
  const type = watch('type', undefined);
  const foundedYear = watch('foundedYear');

  /** @type {PredefinedField[]} */
  const subServices = useMemo(() => predefinedServiceFeatures(type), [type]);

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFTextField name="clientList" label="Client list" fullWidth />
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
              value={new Date().setFullYear(foundedYear || 1800)}
              onChange={(value) => setValue('foundedYear', new Date(value).getFullYear())}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="cta"
              label="Call To Action"
              placeholder="What do you want to achieve?"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name="promoCode" label="Promo Code" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name="description" label="Description" rows={4} multiline fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Label sx={{ mb: 1 }}>Photos</Label>
            <PhotosUploadField name="photos" />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <PredefinedFields
              name="features"
              fields={subServices}
              label="Features"
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