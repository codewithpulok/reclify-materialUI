import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { predefinedServiceFeatures } from 'src/assets/data/predefined-fields/service';
// local components
import PropTypes from 'prop-types';
import {
  AddressField,
  ArrayField,
  BannerField,
  DaysField,
  PhotosUploadField,
  PredefinedFields,
} from 'src/components/common/custom-fields';
import { RHFDatePicker, RHFTextField, RHFTimeRangePicker } from 'src/components/common/hook-form';
import Label from 'src/components/common/label';
import WarehouseReviews from '../../dashboard/warehouses/(seller)/common/warehouse-reviews';
import CustomerList from './customer-list';

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
  const highlights = watch('highlights', '');

  /** @type {PredefinedField[]} */
  const subServices = useMemo(() => predefinedServiceFeatures(type), [type]);

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} mb={2}>
        <BannerField
          photoLabel="Company Logo"
          photoName="logo"
          bannerName="banner"
          primaryText={serviceType?.label}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFTextField name="name" label="Compnay Name" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <AddressField name="address" />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name="website" label="Website" type="url" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <RHFTimeRangePicker
              name="businessHours"
              label="Business Hours"
              wrapperSx={{ gap: 1.3 }}
            />
          </Grid>
          <Grid item xs={12}>
            <DaysField name="operatingDays" label="Operating Days" defaultExpanded />
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
            <RHFTextField name="promoCode" label="Promotion" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="highlights"
              label="Call To Action"
              rows={4}
              helperText={`${200 - (highlights?.length || 0)} character left for highlights`}
              onChangeMiddleware={(v) => (v.length > 200 ? highlights : v)}
              multiline
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name="description" label="Description" rows={4} multiline fullWidth />
          </Grid>

          <Grid item xs={12}>
            <CustomerList />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
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
            <ArrayField
              name="keyFeatures"
              label="Key Features"
              defaultExpanded
              max={3}
              maxLength={200}
            />
          </Grid>

          <Grid item xs={12}>
            <Label sx={{ mb: 1 }}>Photos</Label>
            <PhotosUploadField name="photos" />
          </Grid>

          <Grid item xs={12} mt={1}>
            <WarehouseReviews />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ServiceFields.propTypes = Props;

export default ServiceFields;
