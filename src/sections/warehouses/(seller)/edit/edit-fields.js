import { MenuItem, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
// local components
import {
  predefinedApprovedUses,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
  regions,
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
import { fFixedFloat } from 'src/utils/format-number';

const WarehouseEditFields = (props) => (
  <Grid container spacing={1.5}>
    <Grid item xs={12} md={6}>
      <Grid container spacing={1.2}>
        <Grid item xs={12}>
          <RHFTextField name="name" label="Name" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <RHFTextField name="region" label="Region" fullWidth select>
            {regions.map((option) => (
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
            label="Total space (Pallet)"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <ReferenceTextField
            type="number"
            name="totalSpace"
            label="Total space (Square Feet)"
            fullWidth
            srcTransformer={(v) =>
              v === undefined ? '' : parseFloat(fFixedFloat(v * SQUARE_FEET_PER_PALLET))
            }
            valueTransformer={(v) => (v === '' ? undefined : v / SQUARE_FEET_PER_PALLET)}
          />
        </Grid>

        <Grid item xs={6}>
          <RHFTextField
            type="number"
            name="minSpaceOrder"
            label="Minimum space to order"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField
            type="number"
            name="maxSpaceOrder"
            label="Maximum space to order"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <RHFAccordion
            label="Warehouse Prices"
            names={['price1', 'price3', 'price6', 'price12']}
            defaultExpanded
          >
            <Stack spacing={1.2}>
              <RHFTextField
                type="number"
                name="price1"
                label="For 1 Month"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
              />

              <RHFTextField
                type="number"
                name="price3"
                label="For 3 Month"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
              />

              <RHFTextField
                type="number"
                name="price6"
                label="For 6 Month"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
              />

              <RHFTextField
                type="number"
                name="price12"
                label="For 12 Month"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
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
              min: 0,
            }}
            onChangeMiddleware={(v) => (Number(v) < 0 ? 0 : v)}
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
            label="Features"
            fields={predefinedFeatures}
            defaultExpanded
          />
        </Grid>
        <Grid item xs={12}>
          <PredefinedFields
            name="approvedUses"
            fields={predefinedApprovedUses}
            label="Approved Uses"
            defaultExpanded
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

WarehouseEditFields.propTypes = {};

export default WarehouseEditFields;