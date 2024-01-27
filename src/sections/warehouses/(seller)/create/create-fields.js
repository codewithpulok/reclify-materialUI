import { InputAdornment, MenuItem, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
// local components
import {
  getRegionsBySubRegions,
  predefinedApprovedUses,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
  subRegions,
} from 'src/assets/data';
import {
  AddressField,
  ArrayField,
  PredefinedFields,
  ReferenceTextField,
} from 'src/components/common/custom-fields';
import { RHFAccordion, RHFTextField } from 'src/components/common/hook-form';
import Label from 'src/components/common/label';
import { WarehousePhotoUpload } from 'src/components/warehouse/upload';
import { SQUARE_FEET_PER_PALLET } from 'src/constant/pallet';
import { restrictNegetiveValue } from 'src/utils/form';
import { fFixedFloat } from 'src/utils/format-number';

const CreateFields = (props) => {
  const { watch, getValues, resetField } = useFormContext();
  const subRegion = watch('subRegion');

  useEffect(() => {
    if (subRegion) {
      const region = getValues('region');
      const regions = getRegionsBySubRegions(subRegion);
      if (regions.findIndex((r) => r.code === region) === -1) resetField('region');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subRegion]);

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFTextField name="name" label="Name" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField name="subRegion" label="Region Scope" fullWidth select>
              <MenuItem disabled>Select Region Scope</MenuItem>
              {subRegions.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name}
                </MenuItem>
              ))}
            </RHFTextField>
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="region" label="Region" fullWidth select>
              <MenuItem disabled>Select Region</MenuItem>
              {getRegionsBySubRegions(subRegion).map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name}
                </MenuItem>
              ))}
            </RHFTextField>
          </Grid>

          <Grid item xs={12}>
            <AddressField name="address" />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              valueFormatter={(v) => Math.round(v)}
              type="number"
              name="totalSpace"
              label="Total space available (Pallets)"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <ReferenceTextField
              type="number"
              name="totalSpace"
              label="Total space available (Square Feet)"
              fullWidth
              srcTransformer={(v) =>
                v === null ? '' : parseFloat(fFixedFloat(v * SQUARE_FEET_PER_PALLET))
              }
              valueTransformer={(v) => (v === '' ? null : v / SQUARE_FEET_PER_PALLET)}
              onChangeMiddleware={restrictNegetiveValue}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              type="number"
              name="minSpaceOrder"
              label="Minimum space available (Pallets)"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              type="number"
              name="maxSpaceOrder"
              label="Maximum space available (Pallets)"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <RHFAccordion
              label="Warehouse Prices (Per Pallet)"
              names={['price1', 'price3', 'price6', 'price12']}
              defaultExpanded
            >
              <Stack spacing={1.2}>
                <RHFTextField
                  type="number"
                  name="price1"
                  label="1 Month"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  onChangeMiddleware={restrictNegetiveValue}
                  fullWidth
                />

                <RHFTextField
                  type="number"
                  name="price3"
                  label="3 Month"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  onChangeMiddleware={restrictNegetiveValue}
                  fullWidth
                />

                <RHFTextField
                  type="number"
                  name="price6"
                  label="6 Month"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  onChangeMiddleware={restrictNegetiveValue}
                  fullWidth
                />

                <RHFTextField
                  type="number"
                  name="price12"
                  label="12 Month"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  onChangeMiddleware={restrictNegetiveValue}
                  fullWidth
                />
              </Stack>
            </RHFAccordion>
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              type="number"
              name="discountRate"
              label="Discount Rate"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name="description" label="Description" rows={4} multiline fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Label sx={{ mb: 1 }}>Photos</Label>
            <WarehousePhotoUpload name="photos" />
          </Grid>

          <Grid item xs={12}>
            <PredefinedFields
              name="services"
              fields={predefinedServices}
              label="Available Services and Rates"
              defaultExpanded
            />
          </Grid>
          <Grid item xs={12}>
            <ArrayField name="rules" label="Facility Rules" defaultExpanded />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <PredefinedFields
              name="features"
              fields={predefinedFeatures}
              label="Features"
              defaultExpanded
              showIcon
            />
          </Grid>
          <Grid item xs={12}>
            <PredefinedFields
              name="approvedUses"
              fields={predefinedApprovedUses}
              label="Approved Uses"
              defaultExpanded
              showIcon
            />
          </Grid>
          <Grid item xs={12}>
            <PredefinedFields
              name="facilityDetails"
              fields={predefinedFacility}
              label="Facility Details"
              defaultExpanded
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CreateFields.propTypes = {};

export default CreateFields;
