import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { predefinedServiceFeatures } from 'src/assets/data/predefined-fields/service';
// local components
import PropTypes from 'prop-types';
import {
  ArrayField,
  PhotosUploadField,
  PredefinedFields,
  SinglePhotoUploadField,
} from 'src/components/common/custom-fields';
import { RHFDatePicker, RHFTextField } from 'src/components/common/hook-form';
import { getIconify } from 'src/components/common/iconify/utilities';
import Label from 'src/components/common/label';

const Props = {
  serviceType: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceFields = (props) => {
  const { serviceType } = props;
  const { watch, setValue } = useFormContext();
  const type = watch('type', undefined);
  const foundedYear = watch('foundedYear');

  /** @type {PredefinedField[]} */
  const subServices = useMemo(() => predefinedServiceFeatures(type), [type]);

  return (
    <Grid container spacing={1.5}>
      <Grid xs={12}>
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          {serviceType?.icon && getIconify(serviceType.icon, 48, { color: 'primary.main' })}
          <Typography variant="h2">{serviceType?.label}</Typography>
        </Stack>
      </Grid>

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
            <SinglePhotoUploadField fieldName="logo" label="Company Logo" />
          </Grid>
          <Grid item xs={12}>
            <SinglePhotoUploadField fieldName="banner" label="Company Banner" />
          </Grid>

          <Grid item xs={12}>
            <PredefinedFields
              name="features"
              fields={subServices}
              label="Services"
              defaultExpanded
              showIcon
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

ServiceFields.propTypes = Props;

export default ServiceFields;
